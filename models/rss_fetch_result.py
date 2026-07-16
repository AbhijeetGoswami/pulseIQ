from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Optional

from models.rss_source import RSSSource


@dataclass(slots=True, frozen=True)
class RSSFetchResult:
    """
    Result of fetching a single RSS source.
    """

    source: RSSSource

    status: str

    entries: list[Any] = field(default_factory=list)

    http_status: Optional[int] = None

    duration_ms: int = 0

    parser_warning: Optional[str] = None

    error: Optional[str] = None

    @property
    def article_count(self) -> int:
        return len(self.entries)

    @property
    def success(self) -> bool:
        return self.status in ("HEALTHY", "WARNING")

    def metric(self) -> dict:

        return {
            "source": self.source.name,
            "status": self.status,
            "entries": self.article_count,
            "duration_ms": self.duration_ms,
            "country": self.source.country,
            "sport": self.source.sport,
            "priority": self.source.priority,
            "provider": self.source.provider,
        }