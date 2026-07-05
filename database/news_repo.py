from database.db import get_connection


def save_news(articles):
    """
    Save normalized news articles.

    Returns:
        {
            "inserted": int,
            "duplicates": int,
            "failed": int
        }
    """

    conn = get_connection()
    cursor = conn.cursor()

    inserted = 0
    duplicates = 0
    failed = 0

    for article in articles:

        try:

            cursor.execute(
                """
                INSERT OR IGNORE INTO news
                (
                    title,
                    source,
                    published_at,
                    link,
                    category,
                    sport
                )
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    article.title,
                    article.source,
                    article.published_at,
                    article.link,
                    article.category,
                    article.sport,
                ),
            )

            if cursor.rowcount == 1:
                inserted += 1
            else:
                duplicates += 1

        except Exception as e:

            print(f"Error saving article: {e}")
            failed += 1

    conn.commit()
    conn.close()

    return {
        "inserted": inserted,
        "duplicates": duplicates,
        "failed": failed,
    }


def save_collector_run(summary):
    """
    Save one pipeline execution and return its ID.
    """

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute(
            """
            INSERT INTO collector_runs
            (
                run_started,
                run_finished,
                total_articles,
                inserted,
                duplicates,
                failed,
                duration_ms
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                summary["run_started"],
                summary["run_finished"],
                summary["total_articles"],
                summary["inserted"],
                summary["duplicates"],
                summary["failed"],
                summary["duration_ms"],
            ),
        )

        run_id = cursor.lastrowid
        conn.commit()

        return run_id

    finally:

        conn.close()


def save_source_metrics(run_id, metrics):
    """
    Save per-source RSS performance metrics.
    """

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.executemany(
            """
            INSERT INTO source_metrics
            (
                run_id,
                source,
                status,
                entries,
                duration_ms
            )
            VALUES (?, ?, ?, ?, ?)
            """,
            [
                (
                    run_id,
                    metric["source"],
                    metric["status"],
                    metric["entries"],
                    metric["duration_ms"],
                )
                for metric in metrics
            ],
        )

        conn.commit()

    finally:

        conn.close()