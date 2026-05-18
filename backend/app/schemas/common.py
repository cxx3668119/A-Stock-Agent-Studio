from typing import Generic, TypeVar

from pydantic import BaseModel

DataT = TypeVar("DataT")


class ApiResponse(BaseModel, Generic[DataT]):
    success: bool = True
    data: DataT
    trace_id: str


class ErrorResponse(BaseModel):
    success: bool = False
    error: dict
    trace_id: str


class SSEPayload(BaseModel):
    event: str
    data: dict
