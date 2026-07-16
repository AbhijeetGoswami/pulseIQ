from __future__ import annotations

from connectors.base_connector import BaseConnector
from models.rss_fetch_result import RSSFetchResult
from models.rss_source import RSSSource


class APIConnector(BaseConnector):
    """
    Connector for REST/GraphQL based news providers.

    Examples:
        - NewsAPI
        - GNews
        - Guardian API
        - NYTimes API
        - ESPN APIs
        - FIFA APIs
    """

    @property
    def connector_type(self) -> str:
        return "api"

    def fetch(
        self,
        source: RSSSource,
    ) -> RSSFetchResult:
        raise NotImplementedError(
            f"{self.__class__.__name__} has not been implemented yet."
        )