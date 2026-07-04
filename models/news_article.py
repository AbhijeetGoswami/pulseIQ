from dataclasses import dataclass



@dataclass(slots=True)
class NewsArticle:

    title: str
    source: str
    published_at: str
    link: str
    sport: str = "Unknown"
    category: str | None = None