from collections import Counter


class AttentionEngine:
    """
    Aggregates entity mentions across analyzed articles.
    """

    def calculate(self, analyses: list[dict]) -> dict:

        entity_counter = Counter()
        entity_map = {}

        for analysis in analyses:

            for entity in analysis["entities"]:

                entity_counter[entity["id"]] += 1

                entity_map[entity["id"]] = entity

        ranked_entities = []

        for entity_id, mentions in entity_counter.most_common():

            entity = entity_map[entity_id].copy()

            entity["mentions"] = mentions

            ranked_entities.append(entity)

        return {
            "entities": ranked_entities
        }