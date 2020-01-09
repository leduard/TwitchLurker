function minimizeWindow() {
  const { remote } = require('electron');

  var window = remote.getCurrentWindow();

  window.minimize();
}

function closeWindow() {
  const { remote } = require('electron');

  var window = remote.getCurrentWindow();

  window.close();
}
