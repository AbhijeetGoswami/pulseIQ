from pprint import pprint

from pipeline.pipeline_runner import PipelineRunner


runner = PipelineRunner()


articles = [
    {
        "title": "Lionel Messi scores against Brazil"
    },
    {
        "title": "Lionel Messi wins Ballon d'Or"
    },
    {
        "title": "Lionel Messi captains Argentina"
    },
    {
        "title": "Stephen Curry scores for the Golden State Warriors"
    },
    {
        "title": "Scottie Scheffler wins The Masters"
    },
    {
        "title": "Carlos Alcaraz reaches Wimbledon final"
    },
]


def main():

    print("=" * 80)
    print("PULSEIQ PIPELINE")
    print("=" * 80)

    result = runner.run(
        articles
    )

    print()
    print("=" * 80)
    print("PIPELINE REPORT")
    print("=" * 80)

    print(f"Status              : {result['status']}")

    print(f"Articles Processed  : {result['articles_processed']}")

    print(f"Generated At        : {result['generated_at']}")

    print(
        f"Attention Snapshot  : "
        f"{'Created' if result['attention_snapshot'] else 'Not Created'}"
    )

    print(
        f"Trend Snapshot      : "
        f"{'Created' if result['trend_snapshot'] else 'Skipped'}"
    )

    print(f"Attention File      : {result['attention_file']}")

    print(
        f"Trend File          : "
        f"{result['trend_file'] if result['trend_file'] else 'Not Generated'}"
    )

    print("=" * 80)
    print("ATTENTION SNAPSHOT")
    print("=" * 80)

    pprint(
        result["attention_snapshot"]
    )

    if result["trend_snapshot"]:

        print()
        print("=" * 80)
        print("TREND SNAPSHOT")
        print("=" * 80)

        pprint(
            result["trend_snapshot"]
        )

    print()
    print("=" * 80)
    print("PIPELINE COMPLETED")
    print("=" * 80)


if __name__ == "__main__":
    main()