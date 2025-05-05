import React, { useEffect, useState } from 'react';

const API_BASE_URL = 'http://localhost:50051';

function App() {
  const [a, setA] = useState<string>('0');
  const [b, setB] = useState<string>('0');
  const [operation, setOperation] = useState<string>('add');
  const [result, setResult] = useState<string>('');
  const [calcError, setCalcError] = useState<string>('');

  const handleCalculate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          a: parseFloat(a),
          b: parseFloat(b),
          operation
        })
      });
      const data = await response.json();
      
      if (data.error) {
        setCalcError(data.error);
        setResult('');
      } else {
        setResult(data.result.toString());
        setCalcError('');
      }
    } catch (err) {
      setCalcError('Error performing calculation');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">CtrlGen Video Editor</h1>
              </div>

              <div className="py-8 space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Calculator</h2>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <input
                      type="number"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="First number"
                    />
                    <select
                      value={operation}
                      onChange={(e) => setOperation(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="add">+</option>
                      <option value="subtract">-</option>
                      <option value="multiply">×</option>
                      <option value="divide">÷</option>
                    </select>
                    <input
                      type="number"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Second number"
                    />
                  </div>
                  <button
                    onClick={handleCalculate}
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Calculate
                  </button>
                  {calcError && (
                    <p className="text-red-500">{calcError}</p>
                  )}
                  {result && (
                    <p className="text-xl font-semibold text-gray-900">
                      Result: {result}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 