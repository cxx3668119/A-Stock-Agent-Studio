from enum import StrEnum

from fastapi import Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel


class ErrorCode(StrEnum):
    invalid_stock_code = "INVALID_STOCK_CODE"
    stock_not_found = "STOCK_NOT_FOUND"
    market_data_unavailable = "MARKET_DATA_UNAVAILABLE"
    llm_error = "LLM_ERROR"
    internal_error = "INTERNAL_ERROR"


class AppError(Exception):
    def __init__(self, code: ErrorCode, message: str, status_code: int = 400) -> None:
        self.code = code
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: dict = {}


async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
    trace_id = getattr(request.state, "trace_id", "")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {"code": exc.code, "message": exc.message, "details": {}},
            "trace_id": trace_id,
        },
    )
