from pydantic import BaseModel


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
