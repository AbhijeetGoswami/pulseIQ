from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from intelligence.trend_pipeline import TrendPipeline
from intelligence.snapshot_store import SnapshotStore


router = APIRouter(
    prefix="/trends",
    tags=["Trends"],
)

pipeline = TrendPipeline()
snapshot_store = SnapshotStore()


# --------------------------------------------------
# Request Models
# --------------------------------------------------

class TrendRequest(BaseModel):
    previous_titles: list[str]
    current_titles: list[str]


# --------------------------------------------------
# Analysis Endpoint
# --------------------------------------------------

@router.post("/analyze")
def analyze(request: TrendRequest):

    return pipeline.compare(
        request.previous_titles,
        request.current_titles,
    )


# --------------------------------------------------
# Snapshot Endpoint
# --------------------------------------------------

@router.get("/latest")
def latest_trends():

    snapshot = snapshot_store.latest_trend()

    if snapshot is None:
        raise HTTPException(
            status_code=404,
            detail="No trend snapshots available."
        )

    return snapshot