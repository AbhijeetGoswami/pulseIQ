from pydantic import BaseModel


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