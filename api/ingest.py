"""
API utility functions for news collection and processing
"""
from datetime import datetime, timezone
from time import perf_counter
from typing import Tuple, Dict, Any, Optional

from collectors.news import fetch_news
from database.news_repo import save_news, save_collector_run, save_source_metrics


def collect_news_data() -> Tuple[Dict[str, Any], Optional[int], float]:
    """
    Collect news from all configured sources with timing and metrics.
    
    Returns:
        Tuple containing:
        - Collection result dict with inserted/duplicates/failed counts
        - Run ID from the database
        - Duration in milliseconds
    """
    # -------------------------
    # START PIPELINE TIMER
    # -------------------------
    run_start_time = datetime.now(timezone.utc)
    perf_start = perf_counter()

    # Fetch news from collectors
    articles, metrics = fetch_news()

    # Save news to database
    result = save_news(articles)

    perf_end = perf_counter()
    run_end_time = datetime.now(timezone.utc)

    duration_ms = round((perf_end - perf_start) * 1000)

    # Save collection run metadata
    run_id = save_collector_run({
        "run_started": run_start_time.isoformat(),
        "run_finished": run_end_time.isoformat(),
        "total_articles": len(articles),
        "inserted": result["inserted"],
        "duplicates": result["duplicates"],
        "failed": result["failed"],
        "duration_ms": duration_ms
    })

    # Save source metrics
    if run_id:
        save_source_metrics(run_id, metrics)

    return result, run_id, duration_ms


def get_collection_stats() -> Dict[str, Any]:
    """
    Get statistics about recent collections.
    
    Returns:
        Dictionary with collection statistics
    """
    # This can be expanded to query the database for stats
    return {
        "message": "Collection stats endpoint",
        "description": "Get statistics about news collections"
    }
