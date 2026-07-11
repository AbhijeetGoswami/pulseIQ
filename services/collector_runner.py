import traceback
from datetime import datetime
from time import perf_counter

from collectors.news import fetch_news

from database.news_repo import (
    save_news,
    save_collector_run,
    save_source_metrics,
)

from intelligence.pipeline import process_article
from intelligence.attention_refresh import AttentionRefresh
from intelligence.trend_refresh import TrendRefresh


def run_collection(
    include_metrics: bool = True,
):
    """
    Executes one complete PulseIQ collection cycle.

    Pipeline

    Fetch RSS
        ↓
    Save News
        ↓
    Process Intelligence
        ↓
    Refresh Attention Snapshot
        ↓
    Refresh Trend Snapshot
        ↓
    Save Collection Metrics

    Returns
    -------
    dict
        Collection summary suitable for both
        the REST API and scheduler.
    """

    try:

        # ------------------------------------
        # Start timers
        # ------------------------------------

        run_start_time = datetime.utcnow()
        perf_start = perf_counter()

        # ------------------------------------
        # Fetch RSS Articles
        # ------------------------------------

        articles, metrics = fetch_news()

        print("=" * 70)
        print(f"Fetched Articles : {len(articles)}")
        print("=" * 70)

        # ------------------------------------
        # Save News/Articles
        # ------------------------------------

        result = save_news(articles)

        print("=" * 70)
        print(f"Inserted        : {result['inserted']}")
        print(f"Duplicates      : {result['duplicates']}")
        print(f"Saved Articles  : {len(result['saved_articles'])}")
        print("=" * 70)

        # ------------------------------------
        # Intelligence Pipeline
        # ------------------------------------

        

        for article_id, article in result["saved_articles"]:

            print(f"\nProcessing Article ID : {article_id}")
            print(f"Title : {article.title}")

            process_article(
                article_id,
                article
            )

        if result["inserted"] > 0:
            # ------------------------------------
            # Refresh Attention Snapshot
            # ------------------------------------

            print("=" * 70)
            print("Refreshing Attention Snapshot...")
            print("=" * 70)

            AttentionRefresh().run()

            print("Attention Snapshot Refreshed") 

            #------------------------------------
            # Refresh Trend Snapshot
            #------------------------------------

            print("=" * 70)
            print("Refreshing Trend Snapshot...")
            print("=" * 70)

            TrendRefresh().run()
        else:
         print("No new articles. Skipping snapshot refresh.")       

        # ------------------------------------
        # Stop timers
        # ------------------------------------

        perf_end = perf_counter()
        run_end_time = datetime.utcnow()

        duration_ms = round(
            (perf_end - perf_start) * 1000
        )

        # ------------------------------------
        # Save Collector Run
        # ------------------------------------

        run_id = save_collector_run(
            {
                "run_started": run_start_time.isoformat(),
                "run_finished": run_end_time.isoformat(),
                "total_articles": len(articles),
                "inserted": result["inserted"],
                "duplicates": result["duplicates"],
                "failed": result["failed"],
                "duration_ms": duration_ms,
            }
        )

        # ------------------------------------
        # Save Source Metrics
        # ------------------------------------

        if include_metrics and run_id:

            save_source_metrics(
                run_id,
                metrics
            )

        # ------------------------------------
        # Return CollectionResponse
        # ------------------------------------    

        return {

            "status": "success",

            "run_id": run_id,

            "total_articles": len(articles),

            "inserted": result["inserted"],

            "duplicates": result["duplicates"],

            "failed": result["failed"],

            "duration_ms": duration_ms,

            "run_started": run_start_time.isoformat(),

            "run_finished": run_end_time.isoformat(),

        }
    
    except Exception:

        traceback.print_exc()

        raise