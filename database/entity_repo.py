"""
Repository for persisting resolved entities extracted from news articles.
"""

from datetime import datetime, timezone

from database.db import get_connection


def save_article_entities(article_id: int, entities: list[dict]):
    """
    Save resolved entities for a news article.

    Parameters
    ----------
    article_id : int
        ID of the article in the news table.

    entities : list[dict]
        Example:
        [
            {
                "id": "football_team_england",
                "matched_alias": "England",
                "confidence": 1.0
            },
            {
                "id": "football_competition_fifa_world_cup",
                "matched_alias": "FIFA World Cup",
                "confidence": 1.0
            }
        ]
    """

    if not entities:
        return

    conn = get_connection()
    cursor = conn.cursor()

    created_at = datetime.now(timezone.utc).isoformat()

    for entity in entities:

        cursor.execute(
            """
            INSERT INTO article_entities
            (
                article_id,
                entity_id,
                matched_alias,
                confidence,
                created_at
            )
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                article_id,
                entity["id"],
                entity.get("matched_alias"),
                entity.get("confidence", 1.0),
                created_at,
            ),
        )

    conn.commit()
    conn.close()


def get_entities_for_article(article_id: int):
    """
    Return all entities associated with an article.
    """

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            entity_id,
            matched_alias,
            confidence,
            created_at
        FROM article_entities
        WHERE article_id = ?
        ORDER BY id
        """,
        (article_id,),
    )

    rows = cursor.fetchall()

    conn.close()

    return rows


def get_entity_counts():
    """
    Return total mention count per entity.
    """

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            entity_id,
            COUNT(*) AS mentions
        FROM article_entities
        GROUP BY entity_id
        ORDER BY mentions DESC
        """
    )

    rows = cursor.fetchall()

    conn.close()

    return rows


def get_top_entities(limit: int = 10):
    """
    Return the most frequently mentioned entities.
    """

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            entity_id,
            COUNT(*) AS mentions
        FROM article_entities
        GROUP BY entity_id
        ORDER BY mentions DESC
        LIMIT ?
        """,
        (limit,),
    )

    rows = cursor.fetchall()

    conn.close()

    return rows


def delete_entities_for_article(article_id: int):
    """
    Delete all entities associated with an article.
    Useful when reprocessing an article.
    """

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        DELETE FROM article_entities
        WHERE article_id = ?
        """,
        (article_id,),
    )

    conn.commit()
    conn.close()