from intelligence.entity_matcher import match_entities
from intelligence.entity_resolver import resolve_entities
from database.entity_repo import save_article_entities


def process_article(article_id: int, article):

    matches = match_entities(article.title)

    entities = resolve_entities(matches)

    if entities:
        save_article_entities(
            article_id,
            entities
        )

    return entities