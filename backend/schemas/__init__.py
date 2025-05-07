"""Schemas package for the CtrlGen Video API."""

from .base import StatusResponse
from .video import (
    ProcessVideoRequest,
    ProcessVideoResponse,
    RescaleVideoRequest,
    RescaleVideoResponse,
)
from .calculator import CalculateRequest, CalculateResponse

__all__ = [
    "StatusResponse",
    "ProcessVideoRequest",
    "ProcessVideoResponse",
    "RescaleVideoRequest",
    "RescaleVideoResponse",
    "CalculateRequest",
    "CalculateResponse",
] 