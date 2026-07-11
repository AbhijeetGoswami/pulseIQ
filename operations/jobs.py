from services.collector_runner import run_collection


def collect_news_job():

    print("=" * 70)
    print("Scheduled Collection Started")
    print("=" * 70)

    result = run_collection()

    print(result)

    print("=" * 70)
    print("Scheduled Collection Finished")
    print("=" * 70)