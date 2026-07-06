from intelligence.entity_matcher import resolve_entities

titles = [

    "England prepare for FIFA World Cup clash",

    "India beat Australia in IPL thriller",

    "Manchester United sign goalkeeper",

    "Djokovic wins Wimbledon",

]

for title in titles:

    print("=" * 80)

    print(title)

    print()

    matches = resolve_entities(title)

    for match in matches:

        print(match)