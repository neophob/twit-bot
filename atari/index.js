const app = require('./app');

exports.handler = async (event, context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  return app.main();
};
