from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


class StatusResponse(BaseModel):
    status: str
    version: str


class ProcessVideoRequest(BaseModel):
    input_path: str
    output_path: str


class ProcessVideoResponse(BaseModel):
    success: bool
    message: str


class CalculateRequest(BaseModel):
    operation: str
    a: float
    b: float


class CalculateResponse(BaseModel):
    result: float
    error: str = ""


@app.get("/")
async def root():
    return {"status": "ok", "message": "CtrlGen Video API is running"}


@app.head("/")
async def root_head():
    return {"status": "ok"}


@app.get("/status", response_model=StatusResponse)
async def get_status():
    return StatusResponse(status="Running", version="1.0.0")


@app.post("/process-video", response_model=ProcessVideoResponse)
async def process_video(request: ProcessVideoRequest):
    try:
        # TODO: Implement actual video processing
        return ProcessVideoResponse(
            success=True,
            message=f"Processing video from {request.input_path} to {request.output_path}",
        )
    except Exception as e:
        return ProcessVideoResponse(success=False, message=str(e))


@app.post("/calculate", response_model=CalculateResponse)
async def calculate(request: CalculateRequest):
    try:
        result = 0.0
        error = ""

        if request.operation == "add":
            result = request.a + request.b
        elif request.operation == "subtract":
            result = request.a - request.b
        elif request.operation == "multiply":
            result = request.a * request.b
        elif request.operation == "divide":
            if request.b == 0:
                error = "Division by zero"
            else:
                result = request.a / request.b
        else:
            error = f"Unknown operation: {request.operation}"

        return CalculateResponse(result=result, error=error)
    except Exception as e:
        return CalculateResponse(result=0.0, error=str(e))


@app.get("/health")
async def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=50051)
