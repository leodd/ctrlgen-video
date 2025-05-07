import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import Home from './pages/Home';
import VideoEditor from './pages/VideoEditor';

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static">
          <Toolbar>
            <Container maxWidth="lg" sx={{ display: 'flex', gap: 2 }}>
              <Button
                component={Link}
                to="/"
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to="/editor"
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                Video Editor
              </Button>
            </Container>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<VideoEditor />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App; 