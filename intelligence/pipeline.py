# from intelligence.entity_matcher import match_entities
# from intelligence.entity_resolver import resolve_entities
# from database.entity_repo import save_article_entities


# def process_article(article_id: int, article):

#     matches = match_entities(article.title)

#     entities = resolve_entities(matches)

#     if entities:
#         save_article_entities(
#             article_id,
#             entities
#         )

#     return entities

from intelligence.entity_matcher import match_entities
from intelligence.entity_resolver import resolve_entities
from database.entity_repo import save_article_entities


def process_article(article_id: int, article):

    print("=" * 80)
    print(f"Article ID : {article_id}")
    print(f"Title      : {article.title}")

    matches = match_entities(article.title)
    print(f"Matches     : {matches}")

    entities = resolve_entities(matches)
    print(f"Entities    : {entities}")

    if entities:
        print(f"Saving {len(entities)} entities...")
        save_article_entities(article_id, entities)
        print("Saved successfully.")
    else:
        print("No entities found.")

    return entities