from pprint import pprint

from intelligence.attention_pipeline import AttentionPipeline
from intelligence.trend_detector import TrendDetector


pipeline = AttentionPipeline()
detector = TrendDetector()


previous_titles = [
    "Lionel Messi scores against Brazil",
    "Lionel Messi wins Ballon d'Or",
    "Stephen Curry scores for the Golden State Warriors",
    "Scottie Scheffler wins The Masters",
]

current_titles = [
    "Lionel Messi scores against Brazil",
    "Lionel Messi wins Ballon d'Or",
    "Lionel Messi captains Argentina",
    "Lionel Messi leads Argentina to victory",
    "Stephen Curry scores for the Golden State Warriors",
    "Carlos Alcaraz reaches Wimbledon final",
]


def main():

    print("=" * 80)
    print("GENERATING PREVIOUS SNAPSHOT")
    print("=" * 80)

    previous_snapshot = pipeline.analyze_batch(
        previous_titles
    )

    pprint(previous_snapshot)

    print()
    print("=" * 80)
    print("GENERATING CURRENT SNAPSHOT")
    print("=" * 80)

    current_snapshot = pipeline.analyze_batch(
        current_titles
    )

    pprint(current_snapshot)

    print()
    print("=" * 80)
    print("TREND DETECTOR")
    print("=" * 80)

    trends = detector.compare(
        previous_snapshot,
        current_snapshot,
    )

    pprint(trends)


if __name__ == "__main__":
    main()