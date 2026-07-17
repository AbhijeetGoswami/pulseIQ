from datetime import datetime
from typing import List

from pydantic import BaseModel


class PipelineStatusResponse(BaseModel):
    status: str
    last_run: datetime | None = None
    next_run: datetime | None = None
    scheduler: str
    auto_refresh: str

    sources_online: int
    sources_total: int

    articles_today: int
    runs_today: int

    avg_runtime: float
    success_rate: float


class SourceHealthResponse(BaseModel):
    source: str
    status: str
    articles: int
    last_success: datetime | None = None


class PipelineRunResponse(BaseModel):
    run_id: int
    status: str

    started_at: datetime
    completed_at: datetime | None = None

    duration_ms: int

    total_articles: int
    inserted: int
    duplicates: int

    source_count: int


class PipelineLogResponse(BaseModel):
    timestamp: datetime
    level: str
    message: str


class RunPipelineResponse(BaseModel):
    status: str
    run_id: int


class SourceHealthListResponse(BaseModel):
    items: List[SourceHealthResponse]


class PipelineRunListResponse(BaseModel):
    items: List[PipelineRunResponse]


class PipelineLogListResponse(BaseModel):
    items: List[PipelineLogResponse]