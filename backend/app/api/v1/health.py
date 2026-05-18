from fastapi import APIRouter, Request

from app.core.config import get_settings
from app.schemas.common import ApiResponse

router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
def health(request: Request) -> ApiResponse[dict]:
    settings = get_settings()
    return ApiResponse(
        data={
            "status": "ok",
            "service": "a-stock-agent-api",
            "env": settings.app_env,
            "model": settings.llm_model,
        },
        trace_id=request.state.trace_id,
    )
