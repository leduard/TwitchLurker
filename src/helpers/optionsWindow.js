let dialogOpen = false;
const {
  remote: { app },
} = require('electron');

function loadChannelsFromFile() {
  const fs = require('fs');
  const { dialog } = require('electron').remote;
  const channelsFilePath = `${app.getPath('userData')}\\channels.json`;

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

    let channels = data.replace(/ /g, '').split(',');

    channels = fixChannels(channels);

    fs.writeFileSync(channelsFilePath, JSON.stringify(channels));

    let loadStatus = document.getElementById('load-status');

    loadStatus.innerHTML = 'Done!';

    dialogOpen = false;
  }
}

let newChannelInput = document.getElementById('add-channel-name');

newChannelInput.onchange = () => {
  newChannelInput.classList.remove('warn');
};

function addChannel() {
  const fs = require('fs');

  let channels = newChannelInput.value;
  let log = document.getElementById('add-log');
  let channelsFilePath = `${app.getPath('userData')}\\channels.json`;

  if (!channels || !channels.replace(/ /g, '')) {
    newChannelInput.classList.add('warn');
    log.innerHTML = 'Please type something';
    return;
  }

  channels = fixChannels(channels.replace(/ /g, '').split(','));

  if (fs.existsSync(channelsFilePath)) {
    let oldChannels = fs.readFileSync(channelsFilePath);

    oldChannels = JSON.parse(oldChannels);

    channels.forEach(channel => {
      oldChannels.push(channel);
    });

    fs.writeFileSync(channelsFilePath, JSON.stringify(oldChannels));
    log.innerHTML = 'Done!';
  } else {
    fs.writeFileSync(channelsFilePath, JSON.stringify(channels));
    log.innerHTML = 'Done!';
  }
}

let removeChannelInput = document.getElementById('remove-channel-name');

removeChannelInput.onchange = () => {
  removeChannelInput.classList.remove('warn');
};

function removeChannel() {
  const fs = require('fs');

  let channels = removeChannelInput.value;
  let log = document.getElementById('remove-log');
  let channelsFilePath = `${app.getPath('userData')}\\channels.json`;

  if (!channels || !channels.replace(/ /g, '')) {
    removeChannelInput.classList.add('warn');
    log.innerHTML = 'Please type something';
    return;
  }

  channels = fixChannels(channels.replace(/ /g, '').split(','));

  if (fs.existsSync(channelsFilePath)) {
    let currentChannels = fs.readFileSync(channelsFilePath),
      onList = false;

    currentChannels = JSON.parse(currentChannels);

    for (let x in channels) {
      if (currentChannels.includes(channels[x])) onList = true;
    }

    if (onList) {
      for (let x in channels) {
        currentChannels = currentChannels.filter(
          channel => channel !== channels[x]
        );
      }

      fs.writeFileSync(channelsFilePath, JSON.stringify(currentChannels));
      log.innerHTML = 'Done!';
    } else {
      removeChannelInput.classList.add('warn');
      log.innerHTML = 'Channel not found';
      return;
    }
  } else {
    removeChannelInput.classList.add('warn');
    log.innerHTML = `You don't have any channels to remove`;
    return;
  }
}

function fixChannels(channels) {
  for (let x in channels) {
    if (channels[x] == '') channels.splice(x, 1);
  }
  for (let x in channels) {
    if (!channels[x].startsWith('#')) channels[x] = `#${channels[x]}`;
  }

  return channels;
}
