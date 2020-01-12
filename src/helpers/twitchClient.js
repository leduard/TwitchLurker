const tmi = require('tmi.js');
const fs = require('fs');
const {
  remote: { app },
} = require('electron');

const joinChannels = require('../src/helpers/joinChannels');
const environment = require('../src/configs/environment');

let client = null;

loadCredentials();

async function startLurking() {
  let username = document.getElementById('user').value;
  let pass = document.getElementById('pass').value;
  let log = document.getElementById('logs');
  let error = false;

  let startButton = document.getElementById('start-button');
  startButton.blur();
  log.innerHTML = '';

  if (!username.replace(/ /g, '') || !pass.replace(/ /g, '')) {
    log.innerHTML = 'Please type username and OAuth';
    return;
  } else if (
    username.startsWith(' ') ||
    pass.startsWith(' ') ||
    pass.includes(' ')
  ) {
    if (username.startsWith(' ')) {
      log.innerHTML = 'Please type a valid username';
      return;
    } else if (pass.startsWith(' ') || pass.includes(' ')) {
      log.innerHTML = 'Please type a valid OAuth';
      return;
    }
  }

  startButton.value = '';
  startButton.classList.add('loading');
  startButton.onclick = null;

  log.innerHTML = `Creating client`;

  client = new tmi.Client({
    options: { debug: false },
    connection: {
      reconnect: true,
      secure: true,
    },
    identity: {
      username: username,
      password: pass,
    },
    channels: [],
  });

  log.innerHTML = `Trying to connect`;
  await client.connect().catch(err => {
    error = true;
    log.innerHTML = err;
    startButton.value = 'Start Lurking';
    startButton.classList.remove('loading');
    startButton.onclick = startLurking;
  });

  if (environment(app) == 'DEV') {
    client.on('join', (channel, username, self) => {
      console.log(`${channel}`);
    });
  }

  if (!error) {
    saveCredentials(username, pass);

    log.innerHTML = `Joining channels!`;

    await joinChannels(client).catch(err => {
      error = true;

      log.innerHTML = `${err}`;
      startButton.value = 'Start Lurking';
      startButton.classList.remove('loading');
      startButton.onclick = startLurking;

      client.disconnect();
      client = null;
    });

    if (!error) {
      log.innerHTML = `Joined on all channels!`;
      startButton.value = 'Stop Lurking';
      startButton.classList.remove('loading');
      startButton.classList.add('lurking');
      startButton.onclick = stopLurking;
    }
  }
}

async function stopLurking() {
  await client.disconnect();

  client = null;

  let startButton = document.getElementById('start-button');
  let log = document.getElementById('logs');
  startButton.blur();

  log.innerHTML = '';

  startButton.value = 'Start Lurking';
  startButton.classList.remove('lurking');
  startButton.onclick = startLurking;
}

async function saveCredentials(user, pass) {
  let credentialsPath = `${app.getPath('userData')}\\credentials.json`,
    credentials = {};

  credentials.username = user;
  credentials.pass = pass;

  fs.writeFileSync(credentialsPath, JSON.stringify(credentials), null, 2);
}

async function loadCredentials() {
  let credentialsPath = `${app.getPath('userData')}\\credentials.json`,
    credentials;

  if (fs.existsSync(credentialsPath)) {
    credentials = require(credentialsPath);

    document.getElementById('user').value = credentials.username;
    document.getElementById('pass').value = credentials.pass;
  }
}
