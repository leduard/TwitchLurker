let open = false;
let optionsWindow = null;

function openConfigs() {
  const {
    remote: { BrowserWindow, remote },
  } = require('electron');

  if (!open) {
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
    // optionsWindow.webContents.openDevTools();

    optionsWindow.once('ready-to-show', () => {
      optionsWindow.show();
      open = true;
    });

    optionsWindow.on('closed', () => {
      open = false;
      optionsWindow = null;
    });
  } else {
    optionsWindow.focus();
  }
}

function minimize() {
  const { remote } = require('electron');

  var window = remote.getCurrentWindow();

  window.minimize();
}

function closeOptions() {
  const { remote } = require('electron');

  var window = remote.getCurrentWindow();

  window.close();
}

let dialogOpen = false;

function loadChannelsFromFile() {
  const fs = require('fs');
  const path = require('path');
  const { dialog } = require('electron').remote;

  if (!dialogOpen) {
    dialogOpen = true;
    let file = dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [{ name: 'txt', extensions: ['txt'] }],
    });

    if (!file) {
      dialogOpen = false;
      return;
    }

    let data = fs.readFileSync(file[0], { encoding: 'utf8' });
    // console.log(data);

    let channels = data.replace(/ /g, '').split(',');
    // console.log(channels);

    fs.writeFileSync(
      path.join(__dirname, '..', 'resources', 'channels.json'),
      JSON.stringify(channels)
    );

    let loadStatus = document.getElementById('load-status');

    loadStatus.innerHTML = 'Done!';

    dialogOpen = false;
  }
}
