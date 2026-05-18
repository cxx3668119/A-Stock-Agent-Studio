from app.core.errors import AppError, ErrorCode
from app.providers.mock_market_provider import MockMarketProvider
from app.schemas.stock import StockSearchItem, StockSummary


class MarketDataService:
    def __init__(self, provider: MockMarketProvider | None = None) -> None:
        self.provider = provider or MockMarketProvider()

    def search_stocks(self, query: str) -> list[StockSearchItem]:
        return self.provider.search(query)

    def get_stock_summary(self, code: str) -> StockSummary:
        normalized = self._normalize_code(code)
        summary = self.provider.get_summary(normalized)
        if summary is None:
            raise AppError(ErrorCode.stock_not_found, "未找到该股票，请检查代码", status_code=404)
        return summary

    def get_stock_context(self, code: str) -> dict:
        normalized = self._normalize_code(code)
        context = self.provider.get_context(normalized)
        if not context:
            raise AppError(ErrorCode.stock_not_found, "未找到该股票，请检查代码", status_code=404)
        return context

    def _normalize_code(self, code: str) -> str:
        normalized = code.strip()
        if not normalized.isdigit() or len(normalized) != 6:
            raise AppError(ErrorCode.invalid_stock_code, "股票代码应为 6 位数字")
        return normalized


market_data_service = MarketDataService()
