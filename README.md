# CtrlGen Video Editor

A video editing application built with Electron, React, TypeScript, and Python backend using gRPC for communication.

## Project Structure

```
.
├── backend/           # Python backend with gRPC
│   ├── proto/        # gRPC service definitions
│   └── main.py       # Backend server implementation
├── frontend/         # React frontend
│   ├── src/          # Source files
│   └── public/       # Static files
└── electron/         # Electron main process
```

## Prerequisites

- Node.js (v14 or later)
- Python 3.8 or later
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
cd frontend && npm install
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. Generate gRPC stubs:
```bash
cd backend
python -m grpc_tools.protoc -I./proto --python_out=. --grpc_python_out=. proto/video_service.proto
```

## Development

Start the development environment:
```bash
npm start
```

This will:
1. Start the Python backend server
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
- Real-time communication between frontend and backend using gRPC
- Cross-platform support through Electron
- Type-safe development with TypeScript 