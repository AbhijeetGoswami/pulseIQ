from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor, as_completed

from config.source_registry import SourceRegistry
from intelligence.classifier import classify_sport
from models.news_article import NewsArticle
from services.connector_factory import ConnectorFactory
from services.source_health import SourceHealthService


MAX_WORKERS = 8


def fetch_news():
    """
    Fetch news from all configured sources in parallel.

    Flow

        Source Registry
                │
                ▼
        Connector Factory
                │
                ▼
        Thread Pool
                │
                ▼
        Connectors
                │
                ▼
        Fetch Results
                │
                ▼
        News Articles
    """

    articles = []
    metrics = []
    results = []

    registry = SourceRegistry()
    factory = ConnectorFactory()
    health_service = SourceHealthService()

    sources = registry.enabled_sources()

    def fetch_source(source):
        connector = factory.get(source)
        result = connector.fetch(source)
        return source, connector, result

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:

        futures = [
            executor.submit(fetch_source, source)
            for source in sources
        ]

        for future in as_completed(futures):

            source, connector, result = future.result()
            results.append(result)

            metrics.append(result.metric())

            print("=" * 80)
            print(source.name)
            print(f"Connector   : {connector.connector_type}")
            print(f"Status      : {result.status}")
            print(f"Articles    : {result.article_count}")
            print(f"Duration    : {result.duration_ms} ms")

            if result.http_status:
                print(f"HTTP        : {result.http_status}")

            if result.parser_warning:
                print(f"Warning     : {result.parser_warning}")

            if result.error:
                print(f"Error       : {result.error}")

            print("=" * 80)

            if not result.success:
                continue

            #
            # Business logic remains unchanged
            #
            for entry in result.entries:

                title = getattr(entry, "title", "")

                article = NewsArticle(
                    title=title,
                    source=source.name,
                    published_at=getattr(entry, "published", ""),
                    link=getattr(entry, "link", ""),
                    sport=classify_sport(title),
                    category=None,
                )

                articles.append(article)

        health_service.save(results)

    return articles, metrics