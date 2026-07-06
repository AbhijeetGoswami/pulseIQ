# from intelligence.registry.football import KEYWORDS as FOOTBALL
# from intelligence.registry.cricket.competitions import KEYWORDS as CRICKET
# from intelligence.registry.tennis import KEYWORDS as TENNIS
# from intelligence.registry.formula1 import KEYWORDS as FORMULA1
# from intelligence.registry.rugby import KEYWORDS as RUGBY
# from intelligence.registry.golf import KEYWORDS as GOLF


# SPORTS = {
#     "Football": FOOTBALL,
#     "Cricket": CRICKET,
#     "Tennis": TENNIS,
#     "Formula 1": FORMULA1,
#     "Rugby": RUGBY,
#     "Golf": GOLF,
# }



# def classify_sport(title: str) -> str:

#     text = title.lower()

#     for sport, keywords in SPORTS.items():

#         if any(keyword in text for keyword in keywords):
#             return sport

#     return "Unknown"

