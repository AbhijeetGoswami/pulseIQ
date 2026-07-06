from intelligence.entity_matcher import match_entities
from intelligence.entity_resolver import resolve_entities

from database.news_repo import save_article
from database.entity_repo import save_article_entities


def process_article(article):
    """
    Complete intelligence pipeline for a single article.

    Returns:
        article_id | None
    """

    # ------------------------------------
    # Save article
    # ------------------------------------

    article_id = save_article(article)

    if article_id is None:
        return None

    # ------------------------------------
    # Match entities
    # ------------------------------------

    candidates = match_entities(article.title)

    # ------------------------------------
    # Resolve entities
    # ------------------------------------

    entities = resolve_entities(candidates)

    # ------------------------------------
    # Persist entities
    # ------------------------------------

    save_article_entities(
        article_id,
        entities
    )

    return article_id