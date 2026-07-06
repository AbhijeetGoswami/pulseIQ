from database.db import get_connection


def get_articles(page=1, limit=20):

    conn = get_connection()
    cursor = conn.cursor()

    offset = (page - 1) * limit

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
        ORDER BY id DESC
        LIMIT ?
        OFFSET ?
    """, (limit, offset))

    rows = cursor.fetchall()

    conn.close()

    return [
        {
            "id": row[0],
            "title": row[1],
            "source": row[2],
            "published_at": row[3],
            "link": row[4],
            "category": row[5],
            "sport": row[6]
        }
        for row in rows
    ]