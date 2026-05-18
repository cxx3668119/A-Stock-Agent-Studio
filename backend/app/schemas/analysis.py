from pydantic import BaseModel


class AnalysisOptions(BaseModel):
    include_chart: bool = True
    include_news: bool = True
    include_financials: bool = True


class AnalysisRequest(BaseModel):
    stock_code: str
    analysis_type: str = "stock_deep_dive"
    options: AnalysisOptions = AnalysisOptions()


class AgentStep(BaseModel):
    step: str
    status: str
    message: str


class ReportSection(BaseModel):
    title: str
    content: str
    risk_level: str = "medium"
    source_ids: list[str] = []
