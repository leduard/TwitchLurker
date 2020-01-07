const electronInstaller = require('electron-winstaller');
const url = require('url');

(async () => {
  try {
    await electronInstaller.createWindowsInstaller({
      name: 'TwitchLurker',
      version: '0.0.1',
      description: 'A app to lurk into twitch chats',
      authors: 'Eduardo',
      iconUrl: url.pathToFileURL('./assets/icon.ico').href,
      setupIcon: './assets/icon.ico',
      loadingGif: './assets/loading.gif',
      appDirectory: './release/TwitchLurker-win32-x64',
      outputDirectory: './release/win64-Instalers',
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
})();
