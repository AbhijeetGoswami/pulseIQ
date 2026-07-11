from datetime import datetime
from time import perf_counter

from collectors.news import fetch_news
from database.news_repo import (
    save_news,
    save_collector_run,
    save_source_metrics,
)


class CollectorService:

    def run(
        self,
        include_metrics: bool = True,
    ):
        """
        Executes one complete collection cycle.

        Returns
        -------
        dict
            Collection result suitable for both
            API responses and scheduler execution.
        """

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
        # Next story:
        #
        # - process_article()
        # - AttentionRefresh()
        # - TrendRefresh()
        # - Save collector run
        # - Return response
        #

        return {
            "articles": articles,
            "metrics": metrics,
            "result": result,
            "run_start_time": run_start_time,
            "perf_start": perf_start,
            "include_metrics": include_metrics,
        }