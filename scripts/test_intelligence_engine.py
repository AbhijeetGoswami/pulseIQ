from intelligence.entity_matcher import match_entities
from intelligence.entity_resolver import resolve_entities
from intelligence.classifier import classify_sport



titles = [

    # Football
    "Lionel Messi scores against Brazil",

    # Formula 1
    "Max Verstappen wins the Monaco Grand Prix",

    # Cricket
    "Virat Kohli leads India to victory",

    # Tennis
    "Carlos Alcaraz reaches Wimbledon final",

    # Rugby
    "Beauden Barrett stars for the All Blacks",

    # Golf
    "Scottie Scheffler wins The Masters",

    # Basketball
    "Stephen Curry scores 45 points for the Golden State Warriors",

    # Baseball
    "Aaron Judge hits another home run for the Yankees",

    # Ice Hockey
    "Connor McDavid leads the Edmonton Oilers to victory",
]

for title in titles:

    print("=" * 80)
    print(f"TITLE : {title}")

    matches = match_entities(title)

    print("\nMATCHES")

    for match in matches:
        print(f"- Alias: {match['matched_alias']}")
        print(f"  Candidates: {len(match['candidates'])}")

    entities = resolve_entities(matches)

    print("\nRESOLVED ENTITIES")

    for entity in entities:
        print(f"- {entity['value']} ({entity['type']}) [{entity['sport']}]")

    sport = classify_sport(title)

    print(f"\nCLASSIFIED SPORT : {sport}")

    print()