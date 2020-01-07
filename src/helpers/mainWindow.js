function minimize() {
  const { remote } = require('electron');

  var window = remote.getCurrentWindow();

  window.minimize();
}

function closeMain() {
  const { remote } = require('electron');

  var window = remote.getCurrentWindow();

  window.close();
}
