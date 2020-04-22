const Jimp = require('jimp');
const wpc = require('./wpc');
const twitter = require('./twitter');
const debug = require('debug')('bot:index');

const DMD_WIDTH = 128;
const DMD_HEIGHT = 32;

module.exports = {
  main,
};

function main() {
  let _wpcState;
  return wpc.getRawScreenshot()
    .then(({dmdFrame, wpcState}) => {
      _wpcState = wpcState;
      return savePng(dmdFrame, wpcState);
    })
    .then((pngImage) => {
      const description = buildDescription(_wpcState);
      return twitter.post(pngImage, description);
    })
    .catch((err) => {
      console.error('NO GOOD!', err);
      process.exit(1);
    });
}
