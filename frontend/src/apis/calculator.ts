const API_BASE_URL = 'http://localhost:50051';

interface CalculatorRequest {
  a: number;
  b: number;
  operation: string;
}

interface CalculatorResponse {
  result?: number;
  error?: string;
}

export const calculate = async (request: CalculatorRequest): Promise<CalculatorResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });
    return await response.json();
  } catch (err) {
    console.error('Error performing calculation:', err);
    return { error: 'Error performing calculation' };
  }
}; 