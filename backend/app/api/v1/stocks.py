from fastapi import APIRouter, Request

from app.schemas.common import ApiResponse
from app.schemas.stock import StockSearchItem, StockSummary
from app.services.market_data_service import market_data_service

router = APIRouter(prefix="/stocks", tags=["stocks"])


@router.get("/search")
def search_stocks(request: Request, q: str = "") -> ApiResponse[list[StockSearchItem]]:
    return ApiResponse(data=market_data_service.search_stocks(q), trace_id=request.state.trace_id)


@router.get("/{code}/summary")
def get_stock_summary(request: Request, code: str) -> ApiResponse[StockSummary]:
    return ApiResponse(data=market_data_service.get_stock_summary(code), trace_id=request.state.trace_id)
