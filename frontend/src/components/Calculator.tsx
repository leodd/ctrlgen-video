import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import { calculate } from '../apis/calculator';

const Calculator: React.FC = () => {
  const [a, setA] = useState<string>('0');
  const [b, setB] = useState<string>('0');
  const [operation, setOperation] = useState<string>('add');
  const [result, setResult] = useState<string>('');
  const [calcError, setCalcError] = useState<string>('');

  const handleCalculate = async () => {
    const response = await calculate({
      a: parseFloat(a),
      b: parseFloat(b),
      operation
    });
    
    if (response.error) {
      setCalcError(response.error);
      setResult('');
    } else if (response.result !== undefined) {
      setResult(response.result.toString());
      setCalcError('');
    }
  };

  const handleOperationChange = (event: SelectChangeEvent) => {
    setOperation(event.target.value);
  };

  return (
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
        Calculator
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="First number"
            fullWidth
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Operation</InputLabel>
            <Select
              value={operation}
              onChange={handleOperationChange}
              label="Operation"
            >
              <MenuItem value="add">+</MenuItem>
              <MenuItem value="subtract">-</MenuItem>
              <MenuItem value="multiply">×</MenuItem>
              <MenuItem value="divide">÷</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="Second number"
            fullWidth
          />
        </Box>
        <Button
          variant="contained"
          onClick={handleCalculate}
          fullWidth
          size="large"
        >
          Calculate
        </Button>
        {calcError && (
          <Typography color="error">
            {calcError}
          </Typography>
        )}
        {result && (
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Result: {result}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Calculator; 