from fastapi import APIRouter, Request

from app.core.errors import AppError, ErrorCode
from app.schemas.common import ApiResponse
from app.schemas.report import AnalysisReport, ReportListItem
from app.services.report_service import report_service

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("")
def list_reports(request: Request) -> ApiResponse[list[ReportListItem]]:
    return ApiResponse(data=report_service.list_reports(), trace_id=request.state.trace_id)


@router.get("/{report_id}")
def get_report(request: Request, report_id: str) -> ApiResponse[AnalysisReport]:
    report = report_service.get_report(report_id)
    if report is None:
        raise AppError(ErrorCode.stock_not_found, "未找到该报告", status_code=404)
    return ApiResponse(data=report, trace_id=request.state.trace_id)
