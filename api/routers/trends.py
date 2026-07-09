from fastapi import APIRouter
from pydantic import BaseModel

from intelligence.trend_pipeline import TrendPipeline


router = APIRouter(
    prefix="/trends",
    tags=["Trends"],
)

pipeline = TrendPipeline()


class TrendRequest(BaseModel):
    previous_titles: list[str]
    current_titles: list[str]


@router.post("/analyze")
def analyze(request: TrendRequest):

    return pipeline.compare(
        request.previous_titles,
        request.current_titles,
    )