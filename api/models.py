from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    title: str


class EntityResponse(BaseModel):
    id: str
    type: str
    value: str
    sport: str


class AnalyzeResponse(BaseModel):
    title: str
    sport: str
    entities: list[EntityResponse]

class BatchAnalyzeRequest(BaseModel):
    titles: list[str] = Field(
        min_length=1,
        max_length=100,
    )


class BatchAnalyzeResponse(BaseModel):
    results: list[AnalyzeResponse]