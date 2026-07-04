from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "data" / "pulseiq.db"

# RSS Feeds
RSS_FEEDS = {
    "BBC Sport": "https://feeds.bbci.co.uk/sport/rss.xml",

    "BBC Football": "https://feeds.bbci.co.uk/sport/football/rss.xml",

    "ESPN Top": "https://www.espn.com/espn/rss/news",

    "Sky Sports": "https://www.skysports.com/rss/12040",

    "Yahoo Sports": "https://sports.yahoo.com/rss/",

    "Sportskeeda": "https://www.sportskeeda.com/feed"
}