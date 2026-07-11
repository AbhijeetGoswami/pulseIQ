"""
PulseIQ Intelligence Engine

Public facade for analysing a news headline.

The API layer should call this module instead of directly invoking
matcher/resolver/classifier components.
"""

from intelligence.entity_matcher import match_entities
from intelligence.entity_resolver import resolve_entities
from intelligence.classifier import classify_sport


def analyze_title(title: str) -> dict:
    """
    Analyze a news headline.

    Returns
    -------
    {
        "title": "...",
        "sport": "...",
        "entities": [...]
    }
    """

    matches = match_entities(title)
    resolved_entities = resolve_entities(matches)
    sport = classify_sport(title)

    entities = []

    for entity in resolved_entities:
        entities.append(
            {
                "id": entity["id"],
                "type": entity["type"],
                "value": entity["value"],
                "sport": entity["sport"],
                "matched_alias": entity.get("matched_alias"),
                "confidence": entity.get("confidence", 1.0),
            }
        )

    return {
        "title": title,
        "sport": sport,
        "entities": entities,
    }

def analyze_titles(titles: list[str]) -> list[dict]:
    """
    Analyze multiple news headlines.

    Parameters
    ----------
    titles : list[str]

    Returns
    -------
    list[dict]
    """

    return [analyze_title(title) for title in titles]