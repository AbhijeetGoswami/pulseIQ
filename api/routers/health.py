from fastapi import APIRouter
from datetime import datetime,timezone

router = APIRouter()


@router.get("/health")
async def health_check():
    """
    Health check endpoint to verify API is running
    """
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "service": "PulseIQ API"
    }


@router.get("/status")
async def status():
    """
    Get API status and information
    """
    return {
        "status": "running",
        "service": "PulseIQ - Sports Intelligence Platform",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "news": "/api/articles",
            "collector": "/api/metrics",
            "status": "/api/status"
             }
    }
