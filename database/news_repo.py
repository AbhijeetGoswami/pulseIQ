from database.db import get_connection


def save_news(articles):

    inserted = 0
    duplicates = 0
    failed = 0

    for article in articles:

        try:

            article_id = save_article(article)

            if article_id is None:

                duplicates += 1

            else:

                inserted += 1

        except Exception as e:

            print(e)

            failed += 1

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

def save_article(article):

    conn = get_connection()
    cursor = conn.cursor()

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

        if cursor.rowcount == 0:

            conn.close()

            return None

        article_id = cursor.lastrowid

        conn.commit()
        conn.close()

        return article_id

    except Exception:

        conn.rollback()
        conn.close()

        raise        