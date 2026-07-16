"""
Validate all configured ingestion sources.

Run:

python -m scripts.test_source_registry
"""

from collections import Counter

from config.source_registry import SourceRegistry
from services.connector_factory import ConnectorFactory


def divider():
    print("=" * 100)


def main():

    divider()
    print("ATTENBASE SOURCE REGISTRY VALIDATOR")
    divider()

    registry = SourceRegistry()

    factory = ConnectorFactory()

    sources = registry.enabled_sources()

    print(f"Loaded {len(sources)} enabled sources.\n")

    total_articles = 0
    total_success = 0
    total_failed = 0

    country_counter = Counter()
    sport_counter = Counter()

    results = []

    divider()

    for index, source in enumerate(sources, start=1):

        connector = factory.get(source)

        result = connector.fetch(source)

        print(f"[{index:02}] {source.name}")
        print(f" Connector   : {connector.connector_type}")
        print(f" URL         : {source.url}")
        print(f" Status      : {result.status}")
        print(f" Articles    : {result.article_count}")
        print(f" Duration    : {result.duration_ms} ms")
        print(f" Country     : {source.country}")
        print(f" Sport       : {source.sport}")

        if result.http_status:
            print(f" HTTP        : {result.http_status}")

        if result.parser_warning:
            print(f" Parser Warn : {result.parser_warning}")

        if result.error:
            print(f" Error       : {result.error}")

        print()

        if result.success:
            total_success += 1
        else:
            total_failed += 1

        total_articles += result.article_count

        country_counter[source.country] += 1
        sport_counter[source.sport] += 1

        results.append(result)

    divider()

    print("SUMMARY")

    divider()

    print(f"Sources Tested : {len(results)}")
    print(f"Healthy        : {total_success}")
    print(f"Failed         : {total_failed}")
    print(f"Articles Found : {total_articles}")

    divider()

    print("BY COUNTRY")

    divider()

    for country, count in sorted(country_counter.items()):

        print(f"{country:20} {count}")

    divider()

    print("BY SPORT")

    divider()

    for sport, count in sorted(sport_counter.items()):

        print(f"{sport:20} {count}")

    divider()

    print("TOP SOURCES")

    divider()

    results.sort(
        key=lambda r: r.article_count,
        reverse=True,
    )

    for result in results:

        print(
            f"{result.article_count:4} | "
            f"{result.duration_ms:5} ms | "
            f"{result.status:10} | "
            f"{result.source.name}"
        )

    divider()


if __name__ == "__main__":
    main()