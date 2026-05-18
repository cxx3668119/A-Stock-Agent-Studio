import json

from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse

from app.schemas.analysis import AnalysisRequest
from app.services.stock_analysis_service import stock_analysis_service

router = APIRouter(prefix="/analysis", tags=["analysis"])


def encode_sse(event: str, data: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


@router.post("/stream")
async def stream_analysis(payload: AnalysisRequest, request: Request) -> StreamingResponse:
    trace_id = request.state.trace_id

    async def event_generator():
        async for event, data in stock_analysis_service.analyze_stock_stream(payload, trace_id):
            yield encode_sse(event, data)

    return StreamingResponse(event_generator(), media_type="text/event-stream")
