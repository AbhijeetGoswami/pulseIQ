from database.schema import initialize_database
from collectors.news import fetch_news
from database.news_repo import save_news

if __name__ == "__main__":

    initialize_database()

    articles = fetch_news()

    result = save_news(articles)

    print()

    print("========== PulseIQ ==========")

    print(f"Collected : {len(articles)}")
    print(f"Inserted : {result['inserted']}")
    print(f"Duplicate : {result['duplicates']}")
    print(f"Failed : {result['failed']}")