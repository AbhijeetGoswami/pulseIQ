from collections import Counter


class AttentionEngine:

    def calculate(self, entities: list[dict]) -> dict:
        """
        Calculate attention scores from resolved entities.
        """

        scores = Counter()

        for entity in entities:
            scores[entity["id"]] += 1

        return dict(scores)