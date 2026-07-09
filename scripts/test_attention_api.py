from pprint import pprint

from intelligence.attention_pipeline import AttentionPipeline


pipeline = AttentionPipeline()


def test_single_article():
    print("=" * 80)
    print("ATTENTION API - SINGLE ARTICLE")
    print("=" * 80)

    result = pipeline.analyze(
        "Lionel Messi scores against Brazil"
    )

    pprint(result)


def test_batch_articles():
    print("=" * 80)
    print("ATTENTION API - BATCH")
    print("=" * 80)

    titles = [
        "Lionel Messi scores against Brazil",
        "Stephen Curry scores for the Golden State Warriors",
        "Scottie Scheffler wins The Masters",
        "Carlos Alcaraz reaches Wimbledon final",
        "Max Verstappen wins the Monaco Grand Prix",
    ]

    result = pipeline.analyze_batch(titles)

    pprint(result)


if __name__ == "__main__":
    test_single_article()

    print()

    test_batch_articles()