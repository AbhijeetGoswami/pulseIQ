from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from operations.scheduler import start_scheduler,stop_scheduler
from contextlib import asynccontextmanager

from database.schema import initialize_database
from api.routers import (
    collector,
    dashboard,
    
    health,
    metrics,
    articles,
    entities,
    intelligence,
    attention,
    trends,
    )

from api.routers.pipeline import router as pipeline_router

from api.routers.auth import router as auth_router



# Initialize database on startup
def init_db():
    initialize_database()

@asynccontextmanager
async def lifespan(app: FastAPI):

    init_db()

    start_scheduler()

    yield

    stop_scheduler()

app = FastAPI(
    title="PulseIQ API",
    description="Sports news intelligence platform with real-time data collection and analysis",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(collector.router, prefix="/api", tags=["News"])
app.include_router(metrics.router, prefix="/api", tags=["Metrics"])
app.include_router(articles.router, prefix="/api", tags=["Articles"])
app.include_router(dashboard.router, prefix="/api", tags=["Dashboard"])
# app.include_router(articles_router, prefix="/api", tags=["Articles"])
app.include_router(entities.router, prefix="/api", tags=["Entities"])
app.include_router(intelligence.router, prefix="/api", tags=["Intelligence"])
app.include_router(attention.router,prefix="/api",tags=["Attention"])
app.include_router(trends.router, prefix="/api", tags=["Trends"])
app.include_router(
    pipeline_router,
    prefix="/api",
)
app.include_router(auth_router)


@app.get("/")

async def root():
    return {
        "message": "Welcome to PulseIQ API",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )