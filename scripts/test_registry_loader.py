from intelligence.registry_loader import RegistryLoader

loader = RegistryLoader()

print("=" * 70)

print("Total Entities:", len(loader.get_all_entities()))

print("Football:", len(loader.get_entities_by_sport("Football")))

print("Cricket:", len(loader.get_entities_by_sport("Cricket")))

print("Tennis:", len(loader.get_entities_by_sport("Tennis")))

print("=" * 70)

for entity in loader.get_entities_by_alias("Three Lions"):
    print(entity)

print()

for entity in loader.get_entities_by_alias("Man U"):
    print(entity)

print()

for entity in loader.get_entities_by_alias("IPL"):
    print(entity)

print()

for entity in loader.get_entities_by_alias("Wimbledon"):
    print(entity)