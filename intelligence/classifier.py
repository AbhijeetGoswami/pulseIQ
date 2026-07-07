from collections import Counter

from intelligence.entity_matcher import match_entities
from intelligence.entity_resolver import resolve_entities


def classify_sport(title: str) -> str:

    candidates = match_entities(title)
    entities = resolve_entities(candidates)

    if not entities:
        return "Unknown"

    sport_counts = Counter()

    for entity in entities:
        sport_counts[entity["sport"]] += 1

    return sport_counts.most_common(1)[0][0]