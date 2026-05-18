from datetime import datetime

from app.schemas.stock import EvidenceSource, MetricItem, StockSearchItem, StockSummary


class MockMarketProvider:
    def __init__(self) -> None:
        self._stock = StockSummary(
            name="贵州茅台",
            code="600519",
            market="SH",
            industry="白酒 / 消费",
            price="¥1,684.20",
            change=1.86,
            updated_at="2026-05-17 14:56",
            description="高端白酒龙头，现金流质量和品牌壁垒仍是主要观察维度。",
            metrics=[
                MetricItem(label="PE(TTM)", value="28.4x", hint="估值观察"),
                MetricItem(label="PB", value="9.8x", hint="资产溢价"),
                MetricItem(label="成交额", value="42.6亿", hint="市场活跃度"),
                MetricItem(label="换手率", value="0.22%", hint="低换手"),
                MetricItem(label="ROE", value="31.7%", hint="盈利质量"),
                MetricItem(label="总市值", value="2.11万亿", hint="大盘权重"),
            ],
            sources=[
                EvidenceSource(
                    id="src_market_daily",
                    type="market",
                    provider="mock_akshare",
                    title="A 股日线行情与成交摘要",
                    retrieved_at="2026-05-17 14:56:00",
                    freshness="示例数据",
                ),
                EvidenceSource(
                    id="src_financial_metrics",
                    type="financial",
                    provider="mock_akshare",
                    title="财务指标与估值摘要",
                    retrieved_at="2026-05-17 14:50:00",
                    freshness="示例数据",
                ),
                EvidenceSource(
                    id="src_news_notice",
                    type="news",
                    provider="mock_news",
                    title="新闻公告与舆情摘要",
                    retrieved_at="2026-05-17 14:44:00",
                    freshness="示例数据",
                ),
            ],
        )

    def search(self, query: str) -> list[StockSearchItem]:
        query = query.strip().lower()
        items = [
            StockSearchItem(code="600519", name="贵州茅台", market="SH", industry="白酒 / 消费"),
            StockSearchItem(code="000001", name="平安银行", market="SZ", industry="银行"),
            StockSearchItem(code="300750", name="宁德时代", market="SZ", industry="新能源"),
        ]
        if not query:
            return items
        return [item for item in items if query in item.code.lower() or query in item.name.lower()]

    def get_summary(self, code: str) -> StockSummary | None:
        if code == self._stock.code:
            return self._stock
        return None

    def get_context(self, code: str) -> dict:
        summary = self.get_summary(code)
        if summary is None:
            return {}
        return {
            "summary": summary.model_dump(),
            "retrieved_at": datetime.utcnow().isoformat(),
            "financial_observation": "盈利能力保持较高水平，收入结构和现金流质量是后续观察重点。",
            "technical_observation": "价格处于区间波动阶段，成交量未显示极端放大。",
            "news_observation": "近期公开信息未显示需要单独放大的突发经营风险。",
        }
