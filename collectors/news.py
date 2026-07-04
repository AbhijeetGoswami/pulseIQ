import time
import feedparser

from config import RSS_FEEDS
from models.news_article import NewsArticle
from intelligence.classifier import classify_sport


def fetch_news():

    articles = []
    metrics = []

    for source, url in RSS_FEEDS.items():

        start = time.perf_counter()

        feed = feedparser.parse(url)

        end = time.perf_counter()

        duration_ms = round((end - start) * 1000)

        status = getattr(feed, "status", None)

        metrics.append({
            "source": source,
            "status": status,
            "entries": len(feed.entries),
            "duration_ms": duration_ms
        })

        print(source)
        print(f"Status : {status}")
        print(f"Entries : {len(feed.entries)}")
        print("----------------")

        for entry in feed.entries:

            title = entry.get("title", "")

            article = NewsArticle(
                title=title,
                source=source,
                published_at=entry.get("published", ""),
                link=entry.get("link", ""),
                sport=classify_sport(title),
                category=None
            )

            articles.append(article)

    return articles, metrics