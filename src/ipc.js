const { ipcMain, BrowserWindow, app } = require('electron');
const environment = require('../src/configs/environment');

let optionsWindow = null;

ipcMain.on('openConfigs', () => {
  if (!optionsWindow) {
    optionsWindow = new BrowserWindow({
      width: 400,
      height: 500,
      title: 'Options',
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

    optionsWindow.loadFile('./app/configs.html');

    if (environment(app) == 'DEV') {
      optionsWindow.webContents.openDevTools();
    }

    optionsWindow.once('ready-to-show', () => {
      optionsWindow.show();
    });

    optionsWindow.on('closed', () => {
      optionsWindow = null;
    });
  } else {
    optionsWindow.focus();
  }
});
