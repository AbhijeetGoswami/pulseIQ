import traceback

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from collectors.news import fetch_news
from database.news_repo import save_news, save_collector_run, save_source_metrics
from time import perf_counter
from intelligence.pipeline import process_article

router = APIRouter()


class CollectionResponse(BaseModel):
    """Response model for news collection endpoint"""
    status: str
    run_id: Optional[int] = None
    total_articles: int
    inserted: int
    duplicates: int
    failed: int
    duration_ms: int
    run_started: str
    run_finished: str


class NewsCollectRequest(BaseModel):
    """Request model for news collection"""
    include_metrics: bool = True


@router.post("/collect", response_model=CollectionResponse)
async def collect_news(request: NewsCollectRequest = NewsCollectRequest()):
    """
    Trigger news collection from configured RSS feeds.

    Pipeline:

    Fetch RSS
        ↓
    Save News
        ↓
    Process Intelligence
        ↓
    Save Metrics
    """

    try:

        # ------------------------------------
        # Start timers
        # ------------------------------------

        run_start_time = datetime.utcnow()
        perf_start = perf_counter()

        # ------------------------------------
        # Fetch RSS Articles
        # ------------------------------------

        articles, metrics = fetch_news()

        print("=" * 70)
        print(f"Fetched Articles : {len(articles)}")
        print("=" * 70)

        # ------------------------------------
        # Save Articles
        # ------------------------------------

        result = save_news(articles)

        print("=" * 70)
        print(f"Inserted        : {result['inserted']}")
        print(f"Duplicates      : {result['duplicates']}")
        print(f"Saved Articles  : {len(result['saved_articles'])}")
        print("=" * 70)

        # ------------------------------------
        # Intelligence Pipeline
        # ------------------------------------

        for article_id, article in result["saved_articles"]:

            print(f"\nProcessing Article ID : {article_id}")
            print(f"Title : {article.title}")

            process_article(
                article_id,
                article
            )

        # ------------------------------------
        # Stop timers
        # ------------------------------------

        perf_end = perf_counter()
        run_end_time = datetime.utcnow()

        duration_ms = round(
            (perf_end - perf_start) * 1000
        )

        # ------------------------------------
        # Save Collector Run
        # ------------------------------------

        run_id = save_collector_run(
            {
                "run_started": run_start_time.isoformat(),
                "run_finished": run_end_time.isoformat(),
                "total_articles": len(articles),
                "inserted": result["inserted"],
                "duplicates": result["duplicates"],
                "failed": result["failed"],
                "duration_ms": duration_ms,
            }
        )

        # ------------------------------------
        # Save Source Metrics
        # ------------------------------------

        if request.include_metrics and run_id:

            save_source_metrics(
                run_id,
                metrics
            )

        return CollectionResponse(

            status="success",

            run_id=run_id,

            total_articles=len(articles),

            inserted=result["inserted"],

            duplicates=result["duplicates"],

            failed=result["failed"],

            duration_ms=duration_ms,

            run_started=run_start_time.isoformat(),

            run_finished=run_end_time.isoformat(),

        )

    except Exception:

     traceback.print_exc()

    raise
    

@router.get("/collect/status")
async def collection_status():
    """
    Get information about the news collection endpoint
    """
    return {
        "endpoint": "/api/collect",
        "method": "POST",
        "description": "Trigger news collection from configured RSS feeds",
        "request_body": {
            "include_metrics": "boolean - whether to collect and save metrics"
        }
    }
