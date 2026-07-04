from dataclasses import dataclass
from typing import Optional


@dataclass(slots=True)
class NewsArticle:
    title: str
    source: str
    published_at: str
    link: str
    category: Optional[str] = None