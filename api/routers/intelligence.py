from fastapi import APIRouter

from api.models import (
    AnalyzeRequest,
    AnalyzeResponse,
)

from intelligence.analyzer import analyze_title

router = APIRouter(
    prefix="/intelligence",
    tags=["Intelligence"],
)


@router.post(
    "/analyze",
    response_model=AnalyzeResponse,
)
def analyze(request: AnalyzeRequest):

    return analyze_title(request.title)