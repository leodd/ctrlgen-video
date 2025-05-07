/**
 * Application color palette
 * This file centralizes all color definitions for the application
 */

// Main palette
export const colors = {
  // Primary colors
  primary: {
    light: '#4dabf5',
    main: '#2196f3',
    dark: '#1769aa',
    contrastText: '#ffffff',
  },
  
  // Secondary colors
  secondary: {
    light: '#f5844d',
    main: '#f56c2d',
    dark: '#aa4c1f',
    contrastText: '#ffffff',
  },
  
  // Neutral colors
  neutral: {
    white: '#ffffff',
    offWhite: '#f8f9fa',
    lightest: '#e9ecef',
    lighter: '#dee2e6',
    light: '#ced4da',
    medium: '#adb5bd',
    dark: '#6c757d',
    darker: '#495057',
    darkest: '#343a40',
    black: '#212529',
  },
  
  // Semantic colors
  success: {
    light: '#81c784',
    main: '#4caf50',
    dark: '#388e3c',
  },
  warning: {
    light: '#ffb74d',
    main: '#ff9800',
    dark: '#f57c00',
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
  },
  info: {
    light: '#64b5f6',
    main: '#2196f3',
    dark: '#1976d2',
  },
  
  // Background colors
  background: {
    default: '#ffffff',
    paper: '#f8f9fa',
    dark: '#212529',
  },
  
  // Text colors
  text: {
    primary: '#212529',
    secondary: '#6c757d',
    disabled: '#adb5bd',
    hint: '#6c757d',
    white: '#ffffff',
  },
};

// Export individual color groups for convenience
export const { primary, secondary, neutral, success, warning, error, info, background, text } = colors;

// Default export for easier importing
export default colors; 