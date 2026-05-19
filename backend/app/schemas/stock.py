from pydantic import BaseModel
from datetime import date, datetime
from uuid import UUID

class MetricItem(BaseModel):
    label: str
    value: str
    hint: str | None = None


class EvidenceSource(BaseModel):
    id: str
    type: str
    provider: str
    title: str
    retrieved_at: str
    freshness: str


class StockSearchItem(BaseModel):
    code: str
    name: str
    market: str
    industry: str


class StockSummary(BaseModel):
    name: str
    code: str
    market: str
    industry: str
    price: str
    change: float
    updated_at: str
    description: str
    metrics: list[MetricItem]
    sources: list[EvidenceSource]

class StockRead(BaseModel):
    id: UUID
    code: str
    name: str
    exchange: str | None = None
    industry: str | None = None
    listing_date: date | None = None
    created_at: datetime
    updated_at: datetime
