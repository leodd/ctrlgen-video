import React from 'react';
import { Box, Paper, Typography, Container } from '@mui/material';
import Calculator from '../components/Calculator';

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: 'background.paper',
          }}
        >
          <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 3 }}>
              <Typography variant="h3" component="h1" gutterBottom>
                CtrlGen Video Editor
              </Typography>
            </Box>
            <Box sx={{ pt: 3 }}>
              <Calculator />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home; 