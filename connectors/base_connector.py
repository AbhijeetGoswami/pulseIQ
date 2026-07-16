from __future__ import annotations

from abc import ABC, abstractmethod

from models.rss_fetch_result import RSSFetchResult
from models.rss_source import RSSSource


class BaseConnector(ABC):
    """
    Abstract base class for all ingestion connectors.

    Every connector (RSS, API, Scraper, Reddit, etc.)
    must implement the fetch() method and return an
    RSSFetchResult.

    Example:

        RSSConnector

        NewsAPIConnector

        ScraperConnector
    """

    @property
    @abstractmethod
    def connector_type(self) -> str:
        """
        Returns the connector type.

        Examples:
            rss
            api
            scraper
        """
        raise NotImplementedError

    @abstractmethod
    def fetch(
        self,
        source: RSSSource,
    ) -> RSSFetchResult:
        """
        Fetch content from the supplied source.

        Parameters
        ----------
        source:
            Source configuration loaded from SourceRegistry.

        Returns
        -------
        RSSFetchResult
        """
        raise NotImplementedError