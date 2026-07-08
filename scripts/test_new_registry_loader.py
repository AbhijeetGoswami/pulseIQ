from intelligence.registry_loader import RegistryLoader

loader = RegistryLoader()

print("=" * 80)
print("FORMULA 1 DRIVER LOOKUPS")
print("=" * 80)

driver_aliases = [
    "George Russell",
    "Russell",
    "Lewis Hamilton",
    "Hamilton",
    "Max Verstappen",
    "Verstappen",
    "Charles Leclerc",
    "Leclerc",
    "Lando Norris",
    "Oscar Piastri",
    "Kimi Antonelli",
]

for alias in driver_aliases:

    print(f"\nAlias: {alias}")

    entities = loader.get_entities_by_alias(alias)

    if not entities:
        print("  ❌ NOT FOUND")
        continue

    for entity in entities:
        print(f"  ✓ {entity['value']}")
        print(f"    Type : {entity['type']}")
        print(f"    Sport: {entity['sport']}")


print("\n")
print("=" * 80)
print("FORMULA 1 CONSTRUCTOR LOOKUPS")
print("=" * 80)

constructor_aliases = [
    "Mercedes",
    "Ferrari",
    "McLaren",
    "Red Bull",
    "Williams",
    "Alpine",
    "Haas",
    "Sauber",
]

for alias in constructor_aliases:

    print(f"\nAlias: {alias}")

    entities = loader.get_entities_by_alias(alias)

    if not entities:
        print("  ❌ NOT FOUND")
        continue

    for entity in entities:
        print(f"  ✓ {entity['value']}")
        print(f"    Type : {entity['type']}")
        print(f"    Sport: {entity['sport']}")


print("\n")
print("=" * 80)
print("FORMULA 1 COMPETITION LOOKUPS")
print("=" * 80)

competition_aliases = [
    "Formula 1",
    "F1",
    "British GP",
    "British Grand Prix",
    "Monaco GP",
    "Monaco Grand Prix",
    "Italian GP",
    "Abu Dhabi Grand Prix",
]

for alias in competition_aliases:

    print(f"\nAlias: {alias}")

    entities = loader.get_entities_by_alias(alias)

    if not entities:
        print("  ❌ NOT FOUND")
        continue

    for entity in entities:
        print(f"  ✓ {entity['value']}")
        print(f"    Type : {entity['type']}")
        print(f"    Sport: {entity['sport']}")


print("\n")
print("=" * 80)
print("SUMMARY")
print("=" * 80)

print(f"Total entities : {len(loader.get_all_entities())}")
print(f"Total aliases  : {len(loader.get_all_aliases())}")