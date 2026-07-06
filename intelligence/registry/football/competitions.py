# from intelligence.entity_builder import extract_from_knowledge


FOOTBALL_COMPETITIONS = [

    {
        "id": "football_competition_fifa_world_cup",
        "type": "competition",
        "value": "FIFA World Cup",
        "aliases": [
            "FIFA World Cup",
            "FIFA World Cup 2026",
            "FIFA World Cup 2030",
        ],
        "sport": "Football",
        "metadata": {
            "level": "International",
            "governing_body": "FIFA",
            "frequency": "4 Years",
        },
    },

    {
        "id": "football_competition_uefa_euro",
        "type": "competition",
        "value": "UEFA European Championship",
        "aliases": [
            "UEFA Euro",
            "Euro",
            "European Championship",
            "UEFA European Championship",
        ],
        "sport": "Football",
        "metadata": {
            "level": "International",
            "governing_body": "UEFA",
            "frequency": "4 Years",
        },
    },

    {
        "id": "football_competition_uefa_champions_league",
        "type": "competition",
        "value": "UEFA Champions League",
        "aliases": [
            "Champions League",
            "UEFA Champions League",
            "UCL",
        ],
        "sport": "Football",
        "metadata": {
            "level": "Club",
            "governing_body": "UEFA",
        },
    },

    {
        "id": "football_competition_uefa_europa_league",
        "type": "competition",
        "value": "UEFA Europa League",
        "aliases": [
            "Europa League",
            "UEFA Europa League",
        ],
        "sport": "Football",
        "metadata": {
            "level": "Club",
            "governing_body": "UEFA",
        },
    },

    {
        "id": "football_competition_premier_league",
        "type": "competition",
        "value": "Premier League",
        "aliases": [
            "Premier League",
            "English Premier League",
            "EPL",
        ],
        "sport": "Football",
        "metadata": {
            "country": "England",
            "level": "Club",
        },
    },

    {
        "id": "football_competition_fa_cup",
        "type": "competition",
        "value": "FA Cup",
        "aliases": [
            "FA Cup",
            "The FA Cup",
        ],
        "sport": "Football",
        "metadata": {
            "country": "England",
            "level": "Club",
        },
    },

    {
        "id": "football_competition_la_liga",
        "type": "competition",
        "value": "La Liga",
        "aliases": [
            "La Liga",
            "Spanish La Liga",
        ],
        "sport": "Football",
        "metadata": {
            "country": "Spain",
            "level": "Club",
        },
    },

    {
        "id": "football_competition_serie_a",
        "type": "competition",
        "value": "Serie A",
        "aliases": [
            "Serie A",
            "Italian Serie A",
        ],
        "sport": "Football",
        "metadata": {
            "country": "Italy",
            "level": "Club",
        },
    },

    {
        "id": "football_competition_bundesliga",
        "type": "competition",
        "value": "Bundesliga",
        "aliases": [
            "Bundesliga",
            "German Bundesliga",
        ],
        "sport": "Football",
        "metadata": {
            "country": "Germany",
            "level": "Club",
        },
    },

    {
        "id": "football_competition_ligue_1",
        "type": "competition",
        "value": "Ligue 1",
        "aliases": [
            "Ligue 1",
            "French Ligue 1",
        ],
        "sport": "Football",
        "metadata": {
            "country": "France",
            "level": "Club",
        },
    },

    {
        "id": "football_competition_copa_america",
        "type": "competition",
        "value": "Copa América",
        "aliases": [
            "Copa America",
            "Copa América",
        ],
        "sport": "Football",
        "metadata": {
            "level": "International",
            "governing_body": "CONMEBOL",
        },
    },

    {
        "id": "football_competition_fifa_club_world_cup",
        "type": "competition",
        "value": "FIFA Club World Cup",
        "aliases": [
            "FIFA Club World Cup",
            "Club World Cup",
        ],
        "sport": "Football",
        "metadata": {
            "level": "Club",
            "governing_body": "FIFA",
        },
    },
]





# def extract_competitions(title: str):

#     return extract_from_knowledge(
#         title=title,
#         knowledge=FOOTBALL_COMPETITIONS,
#         entity_type="competition",
#     )