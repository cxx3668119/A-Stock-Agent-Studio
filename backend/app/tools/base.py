from pydantic import BaseModel


class ToolResult(BaseModel):
    name: str
    status: str
    output: dict


class BaseTool:
    name: str
    description: str

    async def invoke(self, payload: dict) -> ToolResult:
        raise NotImplementedError
