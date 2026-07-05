from database.db import get_connection


def get_source_distribution():
    """
    Returns article count grouped by source.
    """

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            source,
            COUNT(*) AS articles
        FROM news
        GROUP BY source
        ORDER BY articles DESC
    """)

    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "source": source,
            "articles": count
        }
        for source, count in rows
    ]

def get_sport_distribution():
    """
    Returns article count grouped by sport.
    """

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            sport,
            COUNT(*) AS articles
        FROM news
        GROUP BY sport
        ORDER BY articles DESC
    """)

    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "sport": sport,
            "articles": count
        }
        for sport, count in rows
    ]

def get_latest_articles(limit=10):
    """
    Returns the latest articles up to the specified limit.
    """

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
       SELECT
            id,
            title,
            source,
            published_at,
            link,
            category,
            sport
        FROM news
        ORDER BY collected_at DESC
        LIMIT ?;
    """, (limit,))

    rows = cursor.fetchall()
    conn.close()

    return [
    {
        "id": id,
        "title": title,
        "source": source,
        "published_at": published_at,
        "link": link,
        "category": category,
        "sport": sport,
    }
    for (
        id,
        title,
        source,
        published_at,
        link,
        category,
        sport,
    ) in rows
    
    ]