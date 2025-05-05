const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const { startBackend } = require('./start-backend');

let mainWindow;
let backendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false // Allow loading local resources
    }
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../frontend/build/index.html')}`;

  console.log('Loading URL:', startUrl); // Debug log

  mainWindow.loadURL(startUrl);

  // Always open DevTools for now to debug
  mainWindow.webContents.openDevTools();

  // Log any errors that occur during page load
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function startApp() {
  try {
    // Create the window immediately
    createWindow();

    // Start the backend first
    backendProcess = await startBackend();
  } catch (error) {
    console.error('Failed to start app:', error);
    app.quit();
  }
}

function cleanup() {
  if (backendProcess) {
    console.log('Cleaning up backend process...');
    // On Windows, we need to kill the process tree
    if (process.platform === 'win32') {
      const { exec } = require('child_process');
      exec(`taskkill /pid ${backendProcess.pid} /T /F`, (error) => {
        if (error) {
          console.error('Error killing backend process:', error);
        }
      });
    } else {
      backendProcess.kill();
    }
    backendProcess = null;
  }
}

// Handle app quit
app.on('before-quit', () => {
  cleanup();
});

// Handle window close
app.on('window-all-closed', () => {
  cleanup();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle app activate (macOS)
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle app quit (macOS)
app.on('will-quit', () => {
  cleanup();
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  cleanup();
  app.quit();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  cleanup();
  app.quit();
});

app.on('ready', startApp); 