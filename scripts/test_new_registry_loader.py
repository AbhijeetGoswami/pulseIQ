from intelligence.registry_loader import RegistryLoader

loader = RegistryLoader()

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