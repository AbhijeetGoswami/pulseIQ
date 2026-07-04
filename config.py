from pathlib import Path

# Database
DB_PATH = Path("data") / "pulseiq.db"

# RSS Feeds
RSS_FEEDS = {
    "BBC": "https://feeds.bbci.co.uk/news/rss.xml",
    "Reuters World": "https://www.reutersagency.com/feed/?best-topics=world&post_type=best",
    "Reuters Business": "https://www.reutersagency.com/feed/?best-topics=business-finance&post_type=best"
}