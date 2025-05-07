"""Base routes for the CtrlGen Video API."""

from fastapi import APIRouter

from schemas.base import StatusResponse

router = APIRouter()


@router.get("/")
async def root():
    return {"status": "ok", "message": "CtrlGen Video API is running"}


@router.head("/")
async def root_head():
    return {"status": "ok"}


@router.get("/status", response_model=StatusResponse)
async def get_status():
    return StatusResponse(status="Running", version="1.0.0")


@router.get("/health")
async def health_check():
    return {"status": "ok"}
