const fs = require('fs');
const {
  remote: { app },
} = require('electron');

const sleep = require('./sleep');

module.exports = async client => {
  let channelsPath = `${app.getPath('userData')}\\channels.json`,
    channels,
    channelCount = document.getElementById('channel-count');

  if (!fs.existsSync(channelsPath)) {
    throw 'Channels file not found. Try load it on options';
  } else {
    channels = require(channelsPath);
  }

  while (client.readyState() != 'OPEN') await sleep(100);

  for (let x = 0; x <= channels.length; x++) {
    client.join(channels[x]).catch(err => {});
    channelCount.innerHTML = `Joined on: ${x} / ${channels.length} channels`;
    await sleep(100);
  }
};
