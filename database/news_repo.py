from sqlite3 import IntegrityError

from database.db import get_connection


def save_news(articles):
    """
    Save normalized news articles.

    Returns:
        dict:
            inserted
            duplicates
            failed
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
                INSERT INTO news
                (
                    title,
                    source,
                    published_at,
                    link,
                    category
                )
                VALUES (?, ?, ?, ?, ?)
                """,
                (
                    article["title"],
                    article["source"],
                    article["published_at"],
                    article["link"],
                    article["category"],
                ),
            )

            inserted += 1

        except IntegrityError:

            duplicates += 1

        except Exception as e:

            print(e)

            failed += 1

    conn.commit()
    conn.close()

    return {
        "inserted": inserted,
        "duplicates": duplicates,
        "failed": failed,
    }