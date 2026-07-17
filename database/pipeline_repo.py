from database.db import get_connection


def get_latest_run():

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute(
            """
            SELECT
                id,
                run_started,
                run_finished,
                total_articles,
                inserted,
                duplicates,
                failed,
                duration_ms
            FROM collector_runs
            ORDER BY id DESC
            LIMIT 1
            """
        )

        row = cursor.fetchone()

        return row

    finally:

        conn.close()


def get_recent_runs(limit=10):

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute(
            """
            SELECT
                id,
                run_started,
                run_finished,
                total_articles,
                inserted,
                duplicates,
                failed,
                duration_ms
            FROM collector_runs
            ORDER BY id DESC
            LIMIT ?
            """,
            (limit,),
        )

        return cursor.fetchall()

    finally:

        conn.close()


def get_runs_today():

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM collector_runs
            WHERE DATE(run_started)=DATE('now')
            """
        )

        return cursor.fetchone()[0]

    finally:

        conn.close()


def get_articles_today():

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM news
            WHERE DATE(published_at)=DATE('now')
            """
        )

        return cursor.fetchone()[0]

    finally:

        conn.close()


def get_average_runtime():

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute(
            """
            SELECT AVG(duration_ms)
            FROM collector_runs
            """
        )

        avg = cursor.fetchone()[0]

        if avg is None:
            return 0

        return round(avg / 1000, 2)

    finally:

        conn.close()


def get_success_rate():

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM collector_runs
            """
        )

        total = cursor.fetchone()[0]

        if total == 0:
            return 100.0

        cursor.execute(
            """
            SELECT COUNT(*)
            FROM collector_runs
            WHERE failed=0
            """
        )

        success = cursor.fetchone()[0]

        return round(success * 100 / total, 2)

    finally:

        conn.close()


def get_source_metrics(limit=20):

    conn = get_connection()
    cursor = conn.cursor()

    try:

        cursor.execute(
            """
            SELECT
                source,
                status,
                entries,
                duration_ms
            FROM source_metrics
            ORDER BY id DESC
            LIMIT ?
            """,
            (limit,),
        )

        return cursor.fetchall()

    finally:

        conn.close()