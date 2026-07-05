from fastapi import APIRouter
from typing import Optional
from datetime import datetime, timedelta

from database.db import get_connection

router = APIRouter()


@router.get("/metrics")
async def get_metrics(days: Optional[int] = 7):
    """
    Get aggregated metrics for news collection over the specified number of days.
    
    Query Parameters:
    - days: Number of days to aggregate (default: 7)
    """
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        # Get recent collection runs
        query = """
        SELECT 
            COUNT(*) as total_runs,
            SUM(total_articles) as total_articles,
            SUM(inserted) as total_inserted,
            SUM(duplicates) as total_duplicates,
            SUM(failed) as total_failed,
            AVG(duration_ms) as avg_duration_ms
        FROM collector_runs
        WHERE run_started >= datetime('now', '-' || ? || ' days')
        """
        
        cursor.execute(query, (days,))
        result = cursor.fetchone()
        
        conn.close()
        
        return {
            "period_days": days,
            "total_runs": result[0] or 0,
            "total_articles": result[1] or 0,
            "total_inserted": result[2] or 0,
            "total_duplicates": result[3] or 0,
            "total_failed": result[4] or 0,
            "avg_duration_ms": round(result[5]) if result[5] else 0
        }
    except Exception as e:
        return {
            "error": str(e),
            "status": "failed"
        }


@router.get("/metrics/sources")
async def get_source_metrics(limit: Optional[int] = 10):
    """
    Get metrics grouped by news source.
    
    Query Parameters:
    - limit: Maximum number of sources to return (default: 10)
    """
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        query = """
        SELECT 
            source,
            COUNT(*) as article_count,
            COUNT(DISTINCT category) as category_count
        FROM news
        GROUP BY source
        ORDER BY article_count DESC
        LIMIT ?
        """
        
        cursor.execute(query, (limit,))
        results = cursor.fetchall()
        
        conn.close()
        
        sources = [
            {
                "source": row[0],
                "article_count": row[1],
                "category_count": row[2]
            }
            for row in results
        ]
        
        return {
            "sources": sources,
            "total_sources": len(sources)
        }
    except Exception as e:
        return {
            "error": str(e),
            "status": "failed"
        }


@router.get("/metrics/sports")
async def get_sports_metrics():
    """
    Get metrics grouped by sport category.
    """
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        query = """
        SELECT 
            sport,
            COUNT(*) as article_count,
            COUNT(DISTINCT source) as source_count
        FROM news
        GROUP BY sport
        ORDER BY article_count DESC
        """
        
        cursor.execute(query)
        results = cursor.fetchall()
        
        conn.close()
        
        sports = [
            {
                "sport": row[0],
                "article_count": row[1],
                "source_count": row[2]
            }
            for row in results
        ]
        
        return {
            "sports": sports,
            "total_sports": len(sports)
        }
    except Exception as e:
        return {
            "error": str(e),
            "status": "failed"
        }
