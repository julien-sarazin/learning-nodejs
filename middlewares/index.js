module.exports = (api) => {
  console.log('initializing middlewares...');
  api.middlewares = {
    logger: require('./logger'),
    ensureUserName: require('./ensureUserName'),
    bodyParser: require('body-parser')
  }
};
