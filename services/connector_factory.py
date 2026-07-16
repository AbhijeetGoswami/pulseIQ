from __future__ import annotations

from connectors.api_connector import APIConnector
from connectors.base_connector import BaseConnector
from connectors.rss_connector import RSSConnector
from connectors.scraper_connector import ScraperConnector
from models.rss_source import RSSSource


class ConnectorFactory:
    """
    Factory responsible for resolving the appropriate connector
    for a configured source.

    Example:

        registry = SourceRegistry()

        factory = ConnectorFactory()

        connector = factory.get(source)

        result = connector.fetch(source)
    """

    def __init__(self):

        self._connectors: dict[str, BaseConnector] = {
            "rss": RSSConnector(),
            "api": APIConnector(),
            "scraper": ScraperConnector(),
        }

    def register(
        self,
        connector: BaseConnector,
    ) -> None:
        """
        Register or replace a connector implementation.
        """

        self._connectors[
            connector.connector_type.lower()
        ] = connector

    def get(
        self,
        source: RSSSource,
    ) -> BaseConnector:
        """
        Return the connector for a source.
        """

        connector_type = (
            source.source_type.lower().strip()
        )

        connector = self._connectors.get(
            connector_type
        )

        if connector is None:

            supported = ", ".join(
                sorted(self._connectors.keys())
            )

            raise ValueError(
                f"Unsupported source type '{connector_type}'. "
                f"Supported connectors: {supported}"
            )

        return connector

    @property
    def supported_connectors(self) -> list[str]:

        return sorted(
            self._connectors.keys()
        )