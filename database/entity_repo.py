"""
Repository for persisting resolved entities extracted from news articles.
"""

from datetime import datetime, timezone

from database.db import get_connection

from collections import defaultdict
from datetime import datetime, timedelta, timezone

from intelligence.registry_loader import registry


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


def search_entities(search: str):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            entity_id,
            COUNT(*) AS mentions
        FROM article_entities
        WHERE entity_id LIKE ?
        GROUP BY entity_id
        ORDER BY mentions DESC
        """,
        (f"%{search}%",),
    )

    rows = cursor.fetchall()

    conn.close()

    return rows


def get_articles_for_entity(entity_id: str):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT

            news.id,

            news.title,

            news.source,

            news.published_at,

            news.link

        FROM article_entities

        JOIN news

        ON article_entities.article_id = news.id

        WHERE entity_id = ?

        ORDER BY news.published_at DESC
        """,
        (entity_id,),
    )

    rows = cursor.fetchall()

    conn.close()

    return rows

def get_recent_article_analyses(hours: int = 24):
    """
    Reconstruct analyses from persisted article_entities.

    Returns the same structure consumed by:

        AttentionEngine.calculate()

    [
        {
            "entities": [
                {...resolved entity...},
                {...resolved entity...}
            ]
        }
    ]
    """

    conn = get_connection()
    cursor = conn.cursor()

    cutoff = (
        datetime.now(timezone.utc) -
        timedelta(hours=hours)
    ).isoformat()

    cursor.execute(
        """
        SELECT
            ae.article_id,
            ae.entity_id
        FROM article_entities ae
        JOIN news n
            ON ae.article_id = n.id
        WHERE n.published_at >= ?
        ORDER BY
            ae.article_id,
            ae.id
        """,
        (cutoff,)
    )

    rows = cursor.fetchall()

    conn.close()

    # ---------------------------------------------
    # Reconstruct analyses expected by
    # AttentionEngine.calculate()
    # ---------------------------------------------

    grouped = defaultdict(list)

    for article_id, entity_id in rows:

        entity = registry.get_entity_by_id(entity_id)

        if entity is None:
            continue

        grouped[article_id].append(entity)

    analyses = []

    for article_id, entities in grouped.items():

        analyses.append(
            {
                "article_id": article_id,
                "entities": entities
            }
        )

    return analyses