from intelligence.entity_matcher import match_entities
from intelligence.entity_resolver import resolve_entities
from intelligence.classifier import classify_sport


titles = [
    "Messi has no equals, and if not for him, Argentina...",
    "Mo Salah: Never Give Up",
    "Endrick breaks silence on Brazil crashing out",
    "Cristiano Ronaldo scores a stunning free kick",
    "Harry Kane nets another hat-trick",
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