from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from routes import base, video, calculator

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(base.router)
app.include_router(video.router, prefix="/video", tags=["video"])
app.include_router(calculator.router, prefix="/calculate", tags=["calculator"])

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=50051)
