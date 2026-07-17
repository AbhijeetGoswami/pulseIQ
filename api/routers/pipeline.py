from fastapi import APIRouter, HTTPException

from services.pipeline_service import (
    get_pipeline_dashboard,
    get_pipeline_logs,
    get_pipeline_runs,
    get_pipeline_status,
    get_source_health,
    run_pipeline,
)

router = APIRouter(
    prefix="/pipeline",
    tags=["Pipeline"],
)




@router.get("/dashboard")
def pipeline_dashboard():

    try:

        return get_pipeline_dashboard()

    except Exception as ex:

        raise HTTPException(
            status_code=500,
            detail=str(ex),
        )
    



@router.get("/status")
def pipeline_status():

    try:

        return get_pipeline_status()

    except Exception as ex:

        raise HTTPException(
            status_code=500,
            detail=str(ex),
        )


@router.get("/runs")
def pipeline_runs(limit: int = 10):

    try:

        return get_pipeline_runs(limit)

    except Exception as ex:

        raise HTTPException(
            status_code=500,
            detail=str(ex),
        )


@router.get("/sources")
def pipeline_sources():

    try:

        return get_source_health()

    except Exception as ex:

        raise HTTPException(
            status_code=500,
            detail=str(ex),
        )


@router.get("/logs")
def pipeline_logs(limit: int = 25):

    try:

        return get_pipeline_logs(limit)

    except Exception as ex:

        raise HTTPException(
            status_code=500,
            detail=str(ex),
        )
    
@router.post("/run")
def pipeline_run():

    try:

        return run_pipeline()

    except Exception as ex:

        raise HTTPException(
            status_code=500,
            detail=str(ex),
        )    