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
        # Save Articles
        # ------------------------------------

        result = save_news(
            articles
        )

        print("=" * 70)
        print(f"Inserted        : {result['inserted']}")
        print(f"Duplicates      : {result['duplicates']}")
        print(f"Saved Articles  : {len(result['saved_articles'])}")
        print("=" * 70)

        #
        # Next section
        #
        # process_article(...)
        #
        # will be moved here next.
        #

        return {
            "articles": articles,
            "metrics": metrics,
            "result": result,
            "run_start_time": run_start_time,
            "perf_start": perf_start,
            "include_metrics": include_metrics,
        }

    except Exception:

        traceback.print_exc()

        raise