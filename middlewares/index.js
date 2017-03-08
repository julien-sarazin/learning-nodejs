module.exports = (api) => {
  console.log('initializing middlewares...');
  api.middlewares = {
    logger: require('./logger'),
    ensureBirthDate: require('./ensureBirthDate'),
    ensureUserName: require('./ensureUserName'),
    bodyParser: require('body-parser')
  }
};
