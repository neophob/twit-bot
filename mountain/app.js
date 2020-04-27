const debug = require('debug')('bot:app');
const twitter = require('./twitter');
const mountain = require('./mount');

module.exports = {
  main,
};

function main() {
  debug('hello');
  const res = mountain.render();
  const description = 'Mountain of the Day: ' + res.name;

  return twitter.post(res.imageBuffer, description)
    .catch((err) => {
      console.error('NO GOOD!', err);
      process.exit(1);
    });

}
