"""Calculator schemas for the CtrlGen Video API."""

from pydantic import BaseModel


class CalculateRequest(BaseModel):
    """Request model for calculations."""
    operation: str
    a: float
    b: float


class CalculateResponse(BaseModel):
    """Response model for calculations."""
    result: float
    error: str = "" 