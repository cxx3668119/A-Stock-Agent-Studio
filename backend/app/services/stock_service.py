from app.schemas.stock import StockRead
from app.models.stock import Stock
from sqlalchemy import select
from sqlalchemy.orm import Session


class StockService:
    def __init__(self, session: Session) -> None:
        self.session = session

    def get_stock_by_code(self, query: str) -> StockRead | None:
        _query = query.strip()
        statement = select(Stock).where(
            (Stock.code.contains(_query)) | (Stock.name.contains(_query))
        ).order_by(Stock.code).limit(20)
        stock = self.session.scalars(statement).first()
        if stock is None:
            return None
        return StockRead.from_orm(stock)
