from fastapi import APIRouter, Depends, Request

# from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_session

# from app.models.stock import Stock

from app.schemas.common import ApiResponse
from app.schemas.stock import StockRead, StockSearchItem, StockSummary
from app.services.market_data_service import market_data_service
from app.services.stock_service import StockService
router = APIRouter(prefix="/stocks", tags=["stocks"])


@router.get("/search")
def search_stocks(
    request: Request,
    q: str = "",
    session: Session = Depends(get_session),
) -> ApiResponse[list[StockSearchItem]]:
    return ApiResponse(
        data=StockService(session).get_stock_by_code(q),
        trace_id=request.state.trace_id,
    )


@router.get("/{code}/summary")
def get_stock_summary(request: Request, code: str) -> ApiResponse[StockSummary]:
    return ApiResponse(
        data=market_data_service.get_stock_summary(code),
        trace_id=request.state.trace_id,
    )


# @router.get("/db")
# def list_db_stocks(
#     request: Request,
#     session: Session = Depends(get_session),
# ) -> ApiResponse[list[StockRead]]:
#     statement = select(Stock)
#     stocks = session.scalars(statement).all()
#     print(stocks)
#     return ApiResponse(
#         data=stocks,
#         trace_id=request.state.trace_id,
#     )
