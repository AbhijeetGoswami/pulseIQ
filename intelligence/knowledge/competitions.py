from intelligence.entity_matcher import longest_match


COMPETITIONS = [
    {"value": "Premier League", "sport": "Football"},
    {"value": "Champions League", "sport": "Football"},
    {"value": "Europa League", "sport": "Football"},
    {"value": "FIFA World Cup", "sport": "Football"},
    {"value": "FA Cup", "sport": "Football"},
    {"value": "La Liga", "sport": "Football"},
    {"value": "Serie A", "sport": "Football"},
    {"value": "Bundesliga", "sport": "Football"},
    {"value": "Ligue 1", "sport": "Football"},

    {"value": "IPL", "sport": "Cricket"},
    {"value": "World Cup", "sport": "Cricket"},
    {"value": "Champions Trophy", "sport": "Cricket"},
    {"value": "The Ashes", "sport": "Cricket"},
    {"value": "Big Bash", "sport": "Cricket"},

    {"value": "Wimbledon", "sport": "Tennis"},
    {"value": "US Open", "sport": "Tennis"},
    {"value": "French Open", "sport": "Tennis"},
    {"value": "Australian Open", "sport": "Tennis"},

    {"value": "Monaco Grand Prix", "sport": "Formula 1"},
    {"value": "British Grand Prix", "sport": "Formula 1"},
    {"value": "Italian Grand Prix", "sport": "Formula 1"},
]





def extract_competitions(title: str):

    lookup = {
        item["value"]: item
        for item in COMPETITIONS
    }

    matches = longest_match(
    title,
    list(lookup.keys())
     )

    entities = []

    for match in matches:

        item = lookup[match]

        entities.append(
            {
                "type": "competition",
                "value": item["value"],
                "sport": item["sport"],
                "confidence": 1.0,
            }
        )

    return entities