from database.schema import initialize_database
from collectors.news import fetch_news
from database.news_repo import save_news, save_collector_run, save_source_metrics

from time import perf_counter
from datetime import datetime,timezone


if __name__ == "__main__":

    initialize_database()

    # -------------------------
    # START PIPELINE TIMER
    # -------------------------
    run_start_time = datetime.now(timezone.utc)
    perf_start = perf_counter()

    articles, metrics = fetch_news()

    result = save_news(articles)

    perf_end = perf_counter()
    run_end_time = datetime.now(timezone.utc)

    duration_ms = round((perf_end - perf_start) * 1000)

    run_id = save_collector_run({
        "run_started": run_start_time.isoformat(),
        "run_finished": run_end_time.isoformat(),
        "total_articles": len(articles),
        "inserted": result["inserted"],
        "duplicates": result["duplicates"],
        "failed": result["failed"],
        "duration_ms": duration_ms
    })

    save_source_metrics(run_id, metrics)