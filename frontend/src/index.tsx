import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App';

declare module '@mui/material/styles' {
  interface Palette {
    mint: {
      main: string;
    };
  }
  interface PaletteOptions {
    mint: {
      main: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2196f3',
    },
    mint: {
      main: '#36ffb5',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
); 