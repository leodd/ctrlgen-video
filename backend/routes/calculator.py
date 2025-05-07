"""Calculator routes for the CtrlGen Video API."""

from fastapi import APIRouter

from schemas.calculator import CalculateRequest, CalculateResponse

router = APIRouter()


@router.post("/", response_model=CalculateResponse)
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