import feedparser
from config import RSS_FEEDS


def fetch_news():
    """
    Fetch news from all configured RSS feeds.
    Returns a list of normalized dictionaries.
    """

    articles = []

    for source, url in RSS_FEEDS.items():

        feed = feedparser.parse(url)

        for entry in feed.entries:

            articles.append(
                {
                    "title": entry.get("title", ""),
                    "source": source,
                    "published_at": entry.get("published", ""),
                    "link": entry.get("link", ""),
                    "category": None,
                }
            )

    return articles