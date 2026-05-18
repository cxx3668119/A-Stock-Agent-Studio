from collections.abc import AsyncIterator

from app.schemas.analysis import ReportSection

DISCLAIMER = "本报告由 AI 基于公开数据生成，仅用于信息整理和学习研究，不构成任何投资建议。市场有风险，投资需谨慎。"


class MockLLMProvider:
    model_name = "mock-a-stock-analyst"

    async def stream_report(self, context: dict) -> AsyncIterator[str]:
        stock = context["summary"]
        chunks = [
            f"{stock['name']}（{stock['code']}）当前样例价格为 {stock['price']}，涨跌幅 {stock['change']}%。",
            "基本面观察：公司品牌壁垒和盈利能力仍是核心观察维度，需结合最新财报持续验证收入质量。",
            "技术面观察：价格呈区间波动特征，成交量未出现极端放大，短期波动仍需结合市场环境判断。",
            "资金与情绪观察：大盘权重属性使其受市场风险偏好影响较明显，新闻公告需持续跟踪。",
            "风险点：需关注消费需求变化、估值波动、行业政策和数据滞后带来的判断偏差。",
            DISCLAIMER,
        ]
        for chunk in chunks:
            yield chunk

    def build_sections(self, context: dict) -> list[ReportSection]:
        return [
            ReportSection(
                title="基本面观察",
                content="品牌壁垒、盈利质量和现金流仍是主要观察维度，但需要结合后续财报验证增长持续性。",
                risk_level="medium",
                source_ids=["src_financial_metrics"],
            ),
            ReportSection(
                title="技术面观察",
                content="样例行情显示价格处于区间波动阶段，成交量未显示极端放大，短期走势不宜脱离市场环境解读。",
                risk_level="medium",
                source_ids=["src_market_daily"],
            ),
            ReportSection(
                title="新闻公告观察",
                content="公开新闻公告摘要未显示需要单独放大的突发经营风险，仍需关注后续公告更新。",
                risk_level="low",
                source_ids=["src_news_notice"],
            ),
            ReportSection(
                title="风险提示",
                content="需关注消费需求、估值波动、行业政策、数据滞后以及模型生成偏差。",
                risk_level="high",
                source_ids=["src_market_daily", "src_financial_metrics", "src_news_notice"],
            ),
        ]
