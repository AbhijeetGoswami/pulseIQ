from intelligence.entity_matcher import match_entities
from intelligence.entity_resolver import resolve_entities
from intelligence.classifier import classify_sport


titles = [
    "George Russell wins the British Grand Prix",
    "Mercedes unveils major upgrade package",
    "Lewis Hamilton joins Ferrari",
    "Max Verstappen dominates at Monaco GP",
    "Kimi Antonelli takes pole position",
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