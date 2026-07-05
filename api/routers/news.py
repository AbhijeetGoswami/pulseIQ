from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from collectors.news import fetch_news
from database.news_repo import save_news, save_collector_run, save_source_metrics
from time import perf_counter

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
    
    This endpoint:
    - Fetches latest news from all configured sources
    - Saves articles to database
    - Collects metrics about the collection run
    - Tracks duplicates and failures
    """
    try:
        # -------------------------
        # START PIPELINE TIMER
        # -------------------------
        run_start_time = datetime.utcnow()
        perf_start = perf_counter()

        # Fetch news from collectors
        articles, metrics = fetch_news()

        # Save news to database
        result = save_news(articles)

        perf_end = perf_counter()
        run_end_time = datetime.utcnow()

        duration_ms = round((perf_end - perf_start) * 1000)

        # Save collection run metadata
        run_id = save_collector_run({
            "run_started": run_start_time.isoformat(),
            "run_finished": run_end_time.isoformat(),
            "total_articles": len(articles),
            "inserted": result["inserted"],
            "duplicates": result["duplicates"],
            "failed": result["failed"],
            "duration_ms": duration_ms
        })

        # Save source metrics if requested
        if request.include_metrics and run_id:
            save_source_metrics(run_id, metrics)

        return CollectionResponse(
            status="success",
            run_id=run_id,
            total_articles=len(articles),
            inserted=result["inserted"],
            duplicates=result["duplicates"],
            failed=result["failed"],
            duration_ms=duration_ms,
            run_started=run_start_time.isoformat(),
            run_finished=run_end_time.isoformat()
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error collecting news: {str(e)}"
        )


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
