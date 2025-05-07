"""Base schemas for the CtrlGen Video API."""

from pydantic import BaseModel


class StatusResponse(BaseModel):
    """Response model for API status."""
    status: str
    version: str 