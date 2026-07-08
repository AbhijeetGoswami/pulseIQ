from intelligence.entity_matcher import match_entities

titles = [

    "England prepare for FIFA World Cup clash",

    "India beat Australia in IPL thriller",

    "Manchester United sign goalkeeper",

    "Djokovic wins Wimbledon",
    
    "After Daniel Alfredsson’s shocking exit for Maple Leafs, Sid Seixeiro floats internal Senators turmoil"

]

for title in titles:

    print("=" * 80)

    print(title)

    print()

    matches = match_entities(title)

    for match in matches:

        print(match)