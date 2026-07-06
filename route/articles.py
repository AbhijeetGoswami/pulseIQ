from fastapi import APIRouter

from database.article_repo import get_articles

router = APIRouter()


@router.get("/articles")
def articles(
    page: int = 1,
    limit: int = 20,
):

    return get_articles(
        page=page,
        limit=limit
    )