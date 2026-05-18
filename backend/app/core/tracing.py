import uuid

from fastapi import Request


def new_trace_id() -> str:
    return f"trace_{uuid.uuid4().hex[:16]}"


async def attach_trace_id(request: Request, call_next):
    request.state.trace_id = request.headers.get("x-trace-id") or new_trace_id()
    response = await call_next(request)
    response.headers["x-trace-id"] = request.state.trace_id
    return response
