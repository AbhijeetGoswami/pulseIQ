from intelligence.knowledge.competitions import extract_competitions


def extract_entities(title: str):

    entities = []

    entities.extend(
        extract_competitions(title)
    )

    # Future additions
    # entities.extend(extract_teams(title))
    # entities.extend(extract_players(title))
    # entities.extend(extract_venues(title))

    return entities