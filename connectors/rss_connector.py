from __future__ import annotations

import time

import feedparser
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from connectors.base_connector import BaseConnector
from models.rss_fetch_result import RSSFetchResult
from models.rss_source import RSSSource


class RSSConnector(BaseConnector):
    """
    RSS ingestion connector.

    Responsible for:

    • Downloading RSS feeds
    • Connection pooling
    • Automatic retries
    • XML parsing
    • Returning FetchResult
    """

    DEFAULT_TIMEOUT = 10

    DEFAULT_MAX_ARTICLES = 50

    USER_AGENT = "AttenBase RSS Connector/2.0"

    @property
    def connector_type(self) -> str:
        return "rss"

    def __init__(self, timeout: int | None = None):

        self.timeout = timeout or self.DEFAULT_TIMEOUT

        self.session = requests.Session()

        retry = Retry(
            total=2,
            connect=2,
            read=2,
            backoff_factor=0.5,
            status_forcelist=[
                429,
                500,
                502,
                503,
                504,
            ],
            allowed_methods=["GET"],
        )

        adapter = HTTPAdapter(
            pool_connections=20,
            pool_maxsize=20,
            max_retries=retry,
        )

        self.session.mount("http://", adapter)
        self.session.mount("https://", adapter)

        self.session.headers.update(
            {
                "User-Agent": self.USER_AGENT
            }
        )

    # -------------------------------------------------------------

    def fetch(
        self,
        source: RSSSource,
    ) -> RSSFetchResult:

        start = time.perf_counter()

        try:

            response = self.session.get(
                source.url,
                timeout=self.timeout,
            )

            response.raise_for_status()

            feed = feedparser.parse(
                response.content
            )

            duration_ms = round(
                (time.perf_counter() - start) * 1000
            )

            parser_warning = None

            if getattr(feed, "bozo", False):
                parser_warning = (
                    type(feed.bozo_exception).__name__
                )

            max_articles = getattr(
                source,
                "max_articles",
                self.DEFAULT_MAX_ARTICLES,
            )

            entries = list(
                feed.entries
            )[:max_articles]

            return RSSFetchResult(
                source=source,
                status=self._determine_status(
                    entries,
                    feed,
                ),
                entries=entries,
                http_status=response.status_code,
                duration_ms=duration_ms,
                parser_warning=parser_warning,
            )

        except requests.Timeout:

            return self._failure(
                source,
                "TIMEOUT",
                start,
            )

        except requests.HTTPError as ex:

            return self._failure(
                source,
                "HTTP_ERROR",
                start,
                http_status=(
                    ex.response.status_code
                    if ex.response
                    else None
                ),
                error=str(ex),
            )

        except requests.RequestException as ex:

            return self._failure(
                source,
                "REQUEST_ERROR",
                start,
                error=str(ex),
            )

        except Exception as ex:

            return self._failure(
                source,
                "FAILED",
                start,
                error=str(ex),
            )

    # -------------------------------------------------------------

    def _determine_status(
        self,
        entries,
        feed,
    ) -> str:

        count = len(entries)

        bozo = getattr(
            feed,
            "bozo",
            False,
        )

        if count > 0 and bozo:
            return "WARNING"

        if count > 0:
            return "HEALTHY"

        if count == 0 and not bozo:
            return "EMPTY"

        return "FAILED"

    # -------------------------------------------------------------

    def _failure(
        self,
        source: RSSSource,
        status: str,
        start: float,
        http_status: int | None = None,
        error: str | None = None,
    ) -> RSSFetchResult:

        duration_ms = round(
            (time.perf_counter() - start) * 1000
        )

        return RSSFetchResult(
            source=source,
            status=status,
            entries=[],
            http_status=http_status,
            duration_ms=duration_ms,
            parser_warning=None,
            error=error,
        )