from datetime import datetime, timezone

from database.db import get_connection
from database.metrics_repo import (
    get_source_distribution,
    get_sport_distribution,
    get_latest_articles
)


def get_dashboard_summary():
    """
    Returns the dashboard summary data.
    """

    conn = get_connection()
    cursor = conn.cursor()

    # -------------------------
    # Collector Summary
    # -------------------------
    cursor.execute("""
        SELECT
            COUNT(*),
            MAX(run_finished),
            AVG(duration_ms)
        FROM collector_runs
    """)

    collector = cursor.fetchone()
    status = "Unknown"

    last_run = collector[1]

    if last_run:
        last_run_dt = datetime.fromisoformat(last_run)
        now = datetime.now()

        elapsed = (now - last_run_dt).total_seconds()

        if elapsed < 600:
            status = "Healthy"

        elif elapsed < 3600:
            status = "Warning"

        else:
            status = "Critical"

    # -------------------------
    # Article Summary
    # -------------------------
    cursor.execute("""
        SELECT COUNT(*)
        FROM news
    """)

    total_articles = cursor.fetchone()[0]

    cursor.execute("""
        SELECT COUNT(*)
        FROM news
        WHERE DATE(collected_at) = DATE('now')
    """)

    articles_today = cursor.fetchone()[0]

    conn.close()

    return {
        "collector": {
            "status": status,
            "total_runs": collector[0] or 0,
            "last_run": collector[1],
            "avg_duration_ms": round(collector[2]) if collector[2] else 0
        },
        "articles": {
            "total": total_articles,
            "today": articles_today
        },
        "collection": get_collection_quality(),
        "source_distribution": get_source_distribution(),
        "sport_distribution": get_sport_distribution(),
        "latest_articles": get_latest_articles()
    }

def get_collection_quality():
    """
    Returns collection statistics for the most recent collector run.
    """

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            total_articles,
            inserted,
            duplicates,
            failed
        FROM collector_runs
        ORDER BY id DESC
        LIMIT 1
    """)

    row = cursor.fetchone()
    conn.close()

    if not row:
        return {
            "found": 0,
            "inserted": 0,
            "duplicates": 0,
            "failed": 0,
            "duplicate_rate": 0.0,
            "new_article_rate": 0.0
        }

    found, inserted, duplicates, failed = row

    duplicate_rate = round((duplicates / found) * 100, 2) if found else 0.0
    new_article_rate = round((inserted / found) * 100, 2) if found else 0.0

    return {
        "found": found,
        "inserted": inserted,
        "duplicates": duplicates,
        "failed": failed,
        "duplicate_rate": duplicate_rate,
        "new_article_rate": new_article_rate
    }