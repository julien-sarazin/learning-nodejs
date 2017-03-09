module.exports = (api) => {
  console.log('initializing middlewares...');
  api.middlewares = {
    logger: require('./logger'),
    bodyParser: require('body-parser')
  }
};
