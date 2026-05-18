from datetime import datetime
from uuid import uuid4

from app.providers.llm_provider import DISCLAIMER
from app.schemas.analysis import ReportSection
from app.schemas.report import AnalysisReport, ReportListItem
from app.schemas.stock import EvidenceSource


class ReportService:
    def __init__(self) -> None:
        self._reports: dict[str, AnalysisReport] = {}

    def create_report(
        self,
        *,
        stock_code: str,
        stock_name: str,
        summary: str,
        sections: list[ReportSection],
        sources: list[EvidenceSource],
        model_name: str,
        trace_id: str,
    ) -> AnalysisReport:
        report_id = f"rpt_{uuid4().hex[:12]}"
        report = AnalysisReport(
            id=report_id,
            stock_code=stock_code,
            stock_name=stock_name,
            title=f"{stock_name}（{stock_code}）AI 投研观察报告",
            summary=summary,
            sections=sections,
            sources=sources,
            model_name=model_name,
            trace_id=trace_id,
            created_at=datetime.utcnow().isoformat(),
            disclaimer=DISCLAIMER,
        )
        self._reports[report_id] = report
        return report

    def list_reports(self) -> list[ReportListItem]:
        reports = sorted(self._reports.values(), key=lambda item: item.created_at, reverse=True)
        return [
            ReportListItem(
                id=report.id,
                stock_code=report.stock_code,
                stock_name=report.stock_name,
                title=report.title,
                summary=report.summary,
                created_at=report.created_at,
                model_name=report.model_name,
            )
            for report in reports
        ]

    def get_report(self, report_id: str) -> AnalysisReport | None:
        return self._reports.get(report_id)


report_service = ReportService()
