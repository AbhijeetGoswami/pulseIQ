# from intelligence.registry.football.competitions import extract_competitions
# from intelligence.registry.football.teams import extract_teams


# def extract_entities(title: str) -> list[dict]:
#     """
#     Extract all supported entities from a news title.
#     """

#     entities = []

#     # Competition entities
#     entities.extend(
#         extract_competitions(title)
#     )

#     # Team entities
#     entities.extend(
#         extract_teams(title)
#     )

#     # Future
#     # entities.extend(extract_players(title))
#     # entities.extend(extract_venues(title))
#     # entities.extend(extract_coaches(title))

#     return entities