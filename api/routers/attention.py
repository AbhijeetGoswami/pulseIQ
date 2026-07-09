from fastapi import APIRouter
from pydantic import BaseModel

from intelligence.attention_pipeline import AttentionPipeline

router = APIRouter(
    prefix="/attention",
    tags=["Attention"],
)

pipeline = AttentionPipeline()


# --------------------------------------------------
# Request Models
# --------------------------------------------------

class AttentionRequest(BaseModel):
    title: str


class BatchAttentionRequest(BaseModel):
    titles: list[str]


# --------------------------------------------------
# Endpoints
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