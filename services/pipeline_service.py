from database import pipeline_repo
from services.collector_runner import run_collection


def get_pipeline_status():

    latest = pipeline_repo.get_latest_run()

    if latest is None:

        return {
            "status": "Not Started",
            "last_run": None,
            "next_run": None,
            "scheduler": "Stopped",
            "auto_refresh": "Disabled",
            "sources_online": 0,
            "sources_total": 0,
            "articles_today": 0,
            "runs_today": 0,
            "avg_runtime": 0,
            "success_rate": 0,
        }

    return {

        "status": "Operational",

        "last_run": latest["run_finished"],

        # Placeholder until scheduler integration
        "next_run": None,

        # Placeholder until scheduler integration
        "scheduler": "Running",

        "auto_refresh": "Enabled",

        # Placeholder until source monitoring
        "sources_online": 18,

        # Placeholder until YAML integration
        "sources_total": 18,

        "articles_today": pipeline_repo.get_articles_today(),

        "runs_today": pipeline_repo.get_runs_today(),

        "avg_runtime": pipeline_repo.get_average_runtime(),

        "success_rate": pipeline_repo.get_success_rate(),
    }


def run_pipeline():

    return run_collection(
        include_metrics=True
    )

def get_pipeline_runs(limit=10):

    rows = pipeline_repo.get_recent_runs(limit)

    runs = []

    for row in rows:

        runs.append({

            "run_id": row["id"],

            "status": "SUCCESS" if row["failed"] == 0 else "FAILED",

            "started_at": row["run_started"],

            "completed_at": row["run_finished"],

            "duration_ms": row["duration_ms"],

            "total_articles": row["total_articles"],

            "inserted": row["inserted"],

            "duplicates": row["duplicates"],

            "source_count": 18,

        })

    return runs


def get_source_health():

    rows = pipeline_repo.get_source_metrics()

    result = []

    for row in rows:

        result.append({

            "source": row["source"],

            "status": row["status"],

            "articles": row["entries"],

            "last_success": None,

        })

    return result


def get_pipeline_logs(limit=20):

    rows = pipeline_repo.get_recent_runs(limit)

    logs = []

    for row in rows:

        logs.append({

            "timestamp": row["run_started"],

            "level": "INFO" if row["failed"] == 0 else "ERROR",

            "message":
                f"Run #{row['id']} processed "
                f"{row['total_articles']} articles "
                f"in {row['duration_ms']} ms."

        })

    return logs

def get_pipeline_dashboard():

    status = get_pipeline_status()

    return {

        "status": status,

        "stats": {

            "sources": status["sources_total"],

            "articles": status["articles_today"],

            "runs_today": status["runs_today"],

            "avg_runtime": status["avg_runtime"],

            "success_rate": status["success_rate"],

        },

        "runs": get_pipeline_runs(),

        "sources": get_source_health(),

        "logs": get_pipeline_logs(),

    }