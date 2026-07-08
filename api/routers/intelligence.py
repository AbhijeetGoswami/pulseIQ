from fastapi import APIRouter

from api.models import (
    AnalyzeRequest,
    AnalyzeResponse,
    BatchAnalyzeRequest,
    BatchAnalyzeResponse,
)

from intelligence.analyzer import (
    analyze_title,
    analyze_titles,
)

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


@router.post(
    "/analyze/batch",
    response_model=BatchAnalyzeResponse,
)
def batch_analyze(request: BatchAnalyzeRequest):

    results = analyze_titles(request.titles)

    return {
        "results": results
    }