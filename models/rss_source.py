from __future__ import annotations

from dataclasses import dataclass, field, asdict
from typing import List, Optional


@dataclass(slots=True, frozen=True)
class RSSSource:
    """
    Represents a configured ingestion source.

    Supports:

        • RSS
        • News APIs
        • Scrapers
        • Reddit
        • YouTube
        • X (Twitter)
        • Future connectors
    """

    # ------------------------------------------------------------------
    # Identity
    # ------------------------------------------------------------------

    id: str
    name: str
    url: str

    # ------------------------------------------------------------------
    # Connector Configuration
    # ------------------------------------------------------------------

    source_type: str = "rss"

    enabled: bool = True

    priority: int = 100

    poll_interval: int = 300

    timeout: int = 10

    retry_count: int = 2

    max_articles: int = 50

    # ------------------------------------------------------------------
    # Metadata
    # ------------------------------------------------------------------

    country: str = "Global"

    language: str = "en"

    category: str = "Sports"

    sport: str = "Multi"

    provider: Optional[str] = None

    description: Optional[str] = None

    logo: Optional[str] = None

    tags: List[str] = field(default_factory=list)

    # ------------------------------------------------------------------
    # Validation
    # ------------------------------------------------------------------

    def __post_init__(self):

        if not self.id.strip():
            raise ValueError("Source id cannot be empty.")

        if not self.name.strip():
            raise ValueError("Source name cannot be empty.")

        if not self.url.startswith(("http://", "https://")):
            raise ValueError(
                f"Invalid URL for source '{self.name}'."
            )

        if self.priority < 0:
            raise ValueError(
                "Priority cannot be negative."
            )

        if self.poll_interval <= 0:
            raise ValueError(
                "poll_interval must be greater than zero."
            )

        if self.timeout <= 0:
            raise ValueError(
                "timeout must be greater than zero."
            )

        if self.retry_count < 0:
            raise ValueError(
                "retry_count cannot be negative."
            )

        if self.max_articles <= 0:
            raise ValueError(
                "max_articles must be greater than zero."
            )

    # ------------------------------------------------------------------
    # Convenience
    # ------------------------------------------------------------------

    @property
    def is_enabled(self) -> bool:
        return self.enabled

    @property
    def is_global(self) -> bool:
        return self.country.lower() == "global"

    # ------------------------------------------------------------------
    # Serialization
    # ------------------------------------------------------------------

    def to_dict(self) -> dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, data: dict) -> "RSSSource":

        return cls(
            id=data["id"],
            name=data["name"],
            url=data["url"],
            source_type=data.get("source_type", "rss"),
            enabled=data.get("enabled", True),
            priority=data.get("priority", 100),
            poll_interval=data.get("poll_interval", 300),
            timeout=data.get("timeout", 10),
            retry_count=data.get("retry_count", 2),
            max_articles=data.get("max_articles", 50),
            country=data.get("country", "Global"),
            language=data.get("language", "en"),
            category=data.get("category", "Sports"),
            sport=data.get("sport", "Multi"),
            provider=data.get("provider"),
            description=data.get("description"),
            logo=data.get("logo"),
            tags=data.get("tags", []),
        )

    # ------------------------------------------------------------------
    # Display
    # ------------------------------------------------------------------

    def __str__(self) -> str:

        status = "Enabled" if self.enabled else "Disabled"

        return (
            f"{self.name} "
            f"[{self.source_type}] "
            f"({self.country}) "
            f"- {status}"
        )

    def __repr__(self) -> str:

        return (
            "RSSSource("
            f"id='{self.id}', "
            f"name='{self.name}', "
            f"url='{self.url}', "
            f"type='{self.source_type}'"
            ")"
        )