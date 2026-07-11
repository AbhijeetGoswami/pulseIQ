# from intelligence.entity_matcher import resolve_entities
from intelligence.entity_resolver import resolve_entities as resolver

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

    # candidates = resolve_entities(title)

    # entities = resolver(candidates)

    # for entity in entities:

    #     print(entity)