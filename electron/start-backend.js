const { spawn, exec } = require('child_process');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');

async function killProcessOnPort(port) {
  return new Promise((resolve, reject) => {
    const command = process.platform === 'win32'
      ? `netstat -ano | findstr :${port}`
      : `lsof -i :${port} -t`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        // No process found on port
        resolve();
        return;
      }

      const pid = stdout.trim();
      if (pid) {
        const killCommand = process.platform === 'win32'
          ? `taskkill /F /PID ${pid}`
          : `kill -9 ${pid}`;

        exec(killCommand, (killError) => {
          if (killError) {
            console.error('Failed to kill process:', killError);
          } else {
            console.log(`Killed process ${pid} on port ${port}`);
          }
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
}

async function startBackend() {
  let pythonPath;
  let scriptPath;

  // Kill any existing process on our port
  await killProcessOnPort(50051);

  if (isDev) {
    // Development mode
    pythonPath = 'python';
    scriptPath = path.join(__dirname, '../backend/main.py');
  } else {
    // Production mode
    if (process.platform === 'win32') {
      pythonPath = path.join(process.resourcesPath, 'backend/venv/Scripts/python.exe');
    } else {
      pythonPath = path.join(process.resourcesPath, 'backend/venv/bin/python');
    }
    scriptPath = path.join(process.resourcesPath, 'backend/main.py');

    // Check if Python executable exists
    if (!fs.existsSync(pythonPath)) {
      throw new Error(`Python executable not found at ${pythonPath}`);
    }

    // Check if script exists
    if (!fs.existsSync(scriptPath)) {
      throw new Error(`Backend script not found at ${scriptPath}`);
    }
  }

  console.log('Starting backend with:', { pythonPath, scriptPath });

  const backend = spawn(pythonPath, [scriptPath]);

  backend.stdout.on('data', (data) => {
    console.log(`Backend stdout: ${data}`);
  });

  backend.stderr.on('data', (data) => {
    console.error(`Backend stderr: ${data}`);
  });

  backend.on('error', (error) => {
    console.error('Failed to start backend:', error);
    throw error;
  });

  backend.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`);
    if (code !== 0) {
      console.error('Backend process exited with error');
    }
  });

  return backend;
}

module.exports = { startBackend }; 