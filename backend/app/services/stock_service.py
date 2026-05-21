from app.models.stock import Stock
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.schemas.stock import StockSearchItem


class StockService:
    def __init__(self, session: Session) -> None:
        self.session = session

    def search_stocks(self, query: str) -> list[StockSearchItem]:

        _query = query.strip()
        statement = (
            select(Stock)
            .where((Stock.code.contains(_query)) | (Stock.name.contains(_query)))
            .order_by(Stock.code)
            .limit(20)
        )
        stocks = self.session.scalars(statement).all()
        return [
            StockSearchItem(
                code=stock.code,
                name=stock.name,
                market=stock.exchange or "",
                industry=stock.industry or "",
            )
            for stock in stocks
        ]
