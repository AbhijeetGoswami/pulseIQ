from __future__ import annotations

from connectors.base_connector import BaseConnector
from models.rss_fetch_result import RSSFetchResult
from models.rss_source import RSSSource


class ScraperConnector(BaseConnector):
    """
    Connector for websites that do not expose RSS or APIs.

    Examples:
        - Sportstar
        - myKhel
        - Firstpost
        - SportsTak
    """

    @property
    def connector_type(self) -> str:
        return "scraper"

    def fetch(
        self,
        source: RSSSource,
    ) -> RSSFetchResult:
        raise NotImplementedError(
            f"{self.__class__.__name__} has not been implemented yet."
        )