from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from database.db import get_connection

router = APIRouter()


class ArticleResponse(BaseModel):
    """Response model for news articles"""
    id: int
    title: str
    source: str
    link: str
    published_at: str
    sport: str
    category: Optional[str] = None


@router.get("/articles", response_model=list[ArticleResponse])
async def get_articles(
    sport: Optional[str] = None,
    source: Optional[str] = None,
    limit: int = 50,
    offset: int = 0
):
    """
    Get news articles with optional filtering.
    
    Query Parameters:
    - sport: Filter by sport (e.g., "football", "cricket")
    - source: Filter by source
    - limit: Maximum number of articles to return (default: 50)
    - offset: Number of articles to skip (default: 0)
    """
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        query = "SELECT id, title, source, link, published_at, sport, category FROM news WHERE 1=1"
        params = []
        
        if sport:
            query += " AND sport = ?"
            params.append(sport)
        
        if source:
            query += " AND source = ?"
            params.append(source)
        
        query += " ORDER BY published_at DESC LIMIT ? OFFSET ?"
        params.extend([limit, offset])
        
        cursor.execute(query, params)
        results = cursor.fetchall()
        
        conn.close()
        
        articles = [
            ArticleResponse(
                id=row[0],
                title=row[1],
                source=row[2],
                link=row[3],
                published_at=row[4],
                sport=row[5],
                category=row[6]
            )
            for row in results
        ]
        
        return articles
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/articles/{article_id}")
async def get_article(article_id: int):
    """
    Get a specific article by ID.
    """
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute(
            "SELECT id, title, source, link, published_at, sport, category FROM news WHERE id = ?",
            (article_id,)
        )
        result = cursor.fetchone()
        
        conn.close()
        
        if not result:
            raise HTTPException(status_code=404, detail="Article not found")
        
        return ArticleResponse(
            id=result[0],
            title=result[1],
            source=result[2],
            link=result[3],
            published_at=result[4],
            sport=result[5],
            category=result[6]
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/articles/count")
async def get_article_count(sport: Optional[str] = None, source: Optional[str] = None):
    """
    Get total count of articles with optional filtering.
    """
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        query = "SELECT COUNT(*) FROM news WHERE 1=1"
        params = []
        
        if sport:
            query += " AND sport = ?"
            params.append(sport)
        
        if source:
            query += " AND source = ?"
            params.append(source)
        
        cursor.execute(query, params)
        count = cursor.fetchone()[0]
        
        conn.close()
        
        return {
            "count": count,
            "sport_filter": sport,
            "source_filter": source
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
