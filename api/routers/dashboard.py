from fastapi import APIRouter, HTTPException

from database.dashboard_repo import get_dashboard_summary

router = APIRouter()


@router.get("/dashboard")
async def dashboard():
    """
    Dashboard summary endpoint.
    """

    try:
        return get_dashboard_summary()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )