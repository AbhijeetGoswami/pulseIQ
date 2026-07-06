from database.db import get_connection
from database.entity_repo import (
    save_article_entities,
    get_entities_for_article,
)

conn = get_connection()
cursor = conn.cursor()

cursor.execute("""
SELECT id
FROM news
LIMIT 1
""")

article_id = cursor.fetchone()[0]

conn.close()

entities = [
    {
        "id": "football_team_england",
        "matched_alias": "England",
        "confidence": 1.0,
    },
    {
        "id": "football_competition_fifa_world_cup",
        "matched_alias": "FIFA World Cup",
        "confidence": 1.0,
    },
]

save_article_entities(article_id, entities)

print(get_entities_for_article(article_id))