from apscheduler.schedulers.background import BackgroundScheduler

from operations.jobs import collect_news_job

scheduler = BackgroundScheduler()


def start_scheduler():

    if scheduler.running:
        return

    scheduler.add_job(
        collect_news_job,
        trigger="interval",
        minutes=10, #-------------For chaning scheduler run time, change value here
        id="news_collector",
        replace_existing=True,
    )

    scheduler.start()

    print("✅ PulseIQ Scheduler Started")


def stop_scheduler():

    if scheduler.running:

        scheduler.shutdown()

        print("🛑 PulseIQ Scheduler Stopped")