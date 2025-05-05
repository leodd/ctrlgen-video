# CtrlGen Video Editor

A video editing application built with Electron, React, TypeScript, and Python FastAPI backend.

## Project Structure

```
.
├── backend/           # Python FastAPI backend
│   ├── venv/         # Python virtual environment
│   ├── requirements.txt  # Python dependencies
│   └── main.py       # FastAPI server implementation
├── frontend/         # React frontend
│   ├── src/          # Source files
│   └── public/       # Static files
├── electron/         # Electron main process
├── dist/            # Production build output
└── build/           # Development build output
```

## Prerequisites

- Node.js (v14 or later)
- Python 3.8 or later
- npm or yarn

## Setup

1. Install dependencies:
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Setup Python backend
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Development

Start the development environment:
```bash
npm start
```

This will:
1. Start the FastAPI backend server
2. Start the React development server
3. Launch the Electron app

## Building

To create a production build:
```bash
npm run build
npm run package
```

The packaged application will be available in the `dist` directory.

## Features

- Modern UI with Tailwind CSS
- RESTful API with FastAPI backend
- Cross-platform support through Electron
- Type-safe development with TypeScript 