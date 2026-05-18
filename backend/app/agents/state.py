from typing import TypedDict


class StockAnalysisState(TypedDict, total=False):
    trace_id: str
    run_id: str
    stock_code: str
    stock_summary: dict
    market_data: dict
    financial_data: dict
    news_data: list[dict]
    final_report: dict
    sources: list[dict]
    errors: list[dict]
