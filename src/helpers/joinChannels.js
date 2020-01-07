const fs = require('fs');
const path = require('path');

const sleep = require('./sleep');

module.exports = async client => {
  let channelsPath = path.join(
      __dirname,
      '..',
      '..',
      'resources',
      'channels.json'
    ),
    channels;

  if (!fs.existsSync(channelsPath)) {
    throw 'Channels file not found. Try load it on configs';
  } else {
    channels = require(channelsPath);
  }

  while (client.readyState() != 'OPEN') await sleep(100);

  for (let x = 0; x <= channels.length; x++) {
    client.join(channels[x]).catch(err => {});
    await sleep(100);
  }
};
