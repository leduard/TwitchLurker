const { app, BrowserWindow } = require('electron');
const environment = require('./src/configs/environment');

require('./src/ipc');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    title: 'Twitch Lurker',
    icon: './assets/icon.ico',
    frame: false,
    transparent: true,
    resizable: false,
    maximizable: false,
    show: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('./app/index.html');

  if (environment(app) == 'DEV') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.focus();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (process.platform != 'darwin') {
      app.quit();
    }
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
