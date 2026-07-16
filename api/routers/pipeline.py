from __future__ import annotations

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from services.source_health import SourceHealthService

router = APIRouter(
    prefix="/pipeline",
    tags=["Pipeline"],
)

health_service = SourceHealthService()


@router.get("/health")
def pipeline_health():
    """
    Returns the latest pipeline/source health report.
    """

    report = health_service.latest()

    if not report:
        return JSONResponse(
            status_code=404,
            content={
                "status": "error",
                "message": "No source health report found.",
            },
        )

    return {
        "status": "success",
        "data": report,
    }


@router.get("/summary")
def pipeline_summary():
    """
    Returns only the summary section.
    """

    report = health_service.latest()

    if not report:
        return JSONResponse(
            status_code=404,
            content={
                "status": "error",
                "message": "No source health report found.",
            },
        )

    return {
        "status": "success",
        "summary": report["summary"],
    }


@router.get("/sources")
def pipeline_sources():
    """
    Returns the list of all configured source health records.
    """

    report = health_service.latest()

    if not report:
        return JSONResponse(
            status_code=404,
            content={
                "status": "error",
                "message": "No source health report found.",
            },
        )

    return {
        "status": "success",
        "sources": report["sources"],
    }