const tmi = require('tmi.js');
const fs = require('fs');
const path = require('path');

const joinChannels = require('../src/helpers/joinChannels');

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
    console.log('type username and pass');
    return;
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

  client.on('join', (channel, username, self) => {
    if (username == 'blackedu') console.log(`${channel}`);
  });

  if (!error) {
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

    saveCredentials(username, pass);
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
  let credentialsPath = path.join(
      __dirname,
      '..',
      'resources',
      'credentials.json'
    ),
    credentials = {};

  credentials.username = user;
  credentials.pass = pass;

  fs.writeFileSync(credentialsPath, JSON.stringify(credentials), null, 2);
}

async function loadCredentials() {
  let credentialsPath = path.join(
      __dirname,
      '..',
      'resources',
      'credentials.json'
    ),
    credentials;

  if (fs.existsSync(credentialsPath)) {
    credentials = require(credentialsPath);

    document.getElementById('user').value = credentials.username;
    document.getElementById('pass').value = credentials.pass;
  }
}
