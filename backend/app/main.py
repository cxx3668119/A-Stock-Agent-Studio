from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import get_settings
from app.core.errors import AppError, app_error_handler
from app.core.logging import configure_logging
from app.core.tracing import attach_trace_id
from app.schemas.common import ApiResponse

settings = get_settings()
configure_logging(settings.log_level)

app = FastAPI(title="A-Stock Agent Studio API", version="0.1.0")
app.middleware("http")(attach_trace_id)
app.add_exception_handler(AppError, app_error_handler)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router)


@app.get("/")
def root() -> ApiResponse[dict]:
    return ApiResponse(
        data={"service": "a-stock-agent-api", "docs": "/docs"},
        trace_id="root",
    )
