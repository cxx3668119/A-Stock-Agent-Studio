from pydantic import BaseModel

from app.schemas.analysis import ReportSection
from app.schemas.stock import EvidenceSource


class AnalysisReport(BaseModel):
    id: str
    stock_code: str
    stock_name: str
    title: str
    summary: str
    sections: list[ReportSection]
    sources: list[EvidenceSource]
    model_name: str
    trace_id: str
    created_at: str
    disclaimer: str


class ReportListItem(BaseModel):
    id: str
    stock_code: str
    stock_name: str
    title: str
    summary: str
    created_at: str
    model_name: str
