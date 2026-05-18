import asyncio
from collections.abc import AsyncIterator

from app.core.errors import AppError, ErrorCode
from app.providers.llm_provider import MockLLMProvider
from app.schemas.analysis import AnalysisRequest
from app.services.market_data_service import MarketDataService, market_data_service
from app.services.report_service import ReportService, report_service


class StockAnalysisService:
    def __init__(
        self,
        market_service: MarketDataService | None = None,
        reports: ReportService | None = None,
        llm_provider: MockLLMProvider | None = None,
    ) -> None:
        self.market_service = market_service or market_data_service
        self.reports = reports or report_service
        self.llm_provider = llm_provider or MockLLMProvider()

    async def analyze_stock_stream(
        self, request: AnalysisRequest, trace_id: str
    ) -> AsyncIterator[tuple[str, dict]]:
        try:
            yield "step", {
                "step": "validate_stock",
                "status": "running",
                "message": "正在校验股票代码",
                "trace_id": trace_id,
            }
            context = self.market_service.get_stock_context(request.stock_code)
            stock = context["summary"]
            yield "step", {
                "step": "validate_stock",
                "status": "success",
                "message": "股票代码校验完成",
                "trace_id": trace_id,
            }

            yield "step", {
                "step": "market_data_agent",
                "status": "running",
                "message": "正在整理行情、财务和新闻摘要",
                "trace_id": trace_id,
            }
            for source in stock["sources"]:
                yield "source", {**source, "trace_id": trace_id}
            yield "step", {
                "step": "market_data_agent",
                "status": "success",
                "message": "数据上下文准备完成",
                "trace_id": trace_id,
            }

            yield "step", {
                "step": "report_agent",
                "status": "running",
                "message": "正在生成结构化观察报告",
                "trace_id": trace_id,
            }
            chunks: list[str] = []
            async for chunk in self.llm_provider.stream_report(context):
                chunks.append(chunk)
                yield "token", {"content": chunk, "trace_id": trace_id}
                await asyncio.sleep(0.05)

            sections = self.llm_provider.build_sections(context)
            report = self.reports.create_report(
                stock_code=stock["code"],
                stock_name=stock["name"],
                summary=chunks[0],
                sections=sections,
                sources=stock["sources"],
                model_name=self.llm_provider.model_name,
                trace_id=trace_id,
            )
            yield "step", {
                "step": "evidence_check",
                "status": "success",
                "message": "数据来源与风险提示已附加",
                "trace_id": trace_id,
            }
            yield "report_completed", {"report_id": report.id, "trace_id": trace_id}
        except AppError as exc:
            yield "error", {"code": exc.code, "message": exc.message, "trace_id": trace_id}
        except Exception:
            yield "error", {
                "code": ErrorCode.internal_error,
                "message": "AI 分析生成失败，请稍后重试",
                "trace_id": trace_id,
            }


stock_analysis_service = StockAnalysisService()
