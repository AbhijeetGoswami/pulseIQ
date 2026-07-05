from fastapi.testclient import TestClient
from app import app

client = TestClient(app)


def test_dashboard_returns_200():
    response = client.get("/api/dashboard")
    assert response.status_code == 200


def test_dashboard_structure():
    data = client.get("/api/dashboard").json()

    assert isinstance(data["collector"], dict)
    assert isinstance(data["articles"], dict)
    assert isinstance(data["collection"], dict)
    assert isinstance(data["source_distribution"], list)
    assert isinstance(data["sport_distribution"], list)
    assert isinstance(data["latest_articles"], list)


def test_collector_fields():
    collector = client.get("/api/dashboard").json()["collector"]

    assert isinstance(collector["status"], str)
    assert isinstance(collector["total_runs"], int)
    assert isinstance(collector["avg_duration_ms"], int)


def test_collection_fields():
    collection = client.get("/api/dashboard").json()["collection"]

    assert isinstance(collection["found"], int)
    assert isinstance(collection["inserted"], int)
    assert isinstance(collection["duplicates"], int)
    assert isinstance(collection["failed"], int)
    assert isinstance(collection["duplicate_rate"], float)
    assert isinstance(collection["new_article_rate"], float)


def test_latest_articles_is_list():
    latest = client.get("/api/dashboard").json()["latest_articles"]

    assert isinstance(latest, list)

    if latest:
        article = latest[0]

        assert "title" in article
        assert "source" in article
        assert "published_at" in article
        assert "link" in article
        assert "sport" in article