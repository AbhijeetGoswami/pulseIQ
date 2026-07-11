from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from intelligence.attention_pipeline import AttentionPipeline
from intelligence.snapshot_store import SnapshotStore

router = APIRouter(
    prefix="/attention",
    tags=["Attention"],
)

pipeline = AttentionPipeline()
snapshot_store = SnapshotStore()


# --------------------------------------------------
# Request Models
# --------------------------------------------------

class AttentionRequest(BaseModel):
    title: str


class BatchAttentionRequest(BaseModel):
    titles: list[str]


# --------------------------------------------------
# Analysis Endpoints
# --------------------------------------------------

@router.post("/analyze")
def analyze(request: AttentionRequest):

    return pipeline.analyze(
        request.title
    )


@router.post("/analyze/batch")
def analyze_batch(request: BatchAttentionRequest):

    return pipeline.analyze_batch(
        request.titles
    )


# --------------------------------------------------
# Snapshot Endpoints
# --------------------------------------------------

@router.get("/latest")
def latest_attention():

    snapshot = snapshot_store.latest_attention()

    if snapshot is None:
        raise HTTPException(
            status_code=404,
            detail="No attention snapshots available."
        )

    return snapshot