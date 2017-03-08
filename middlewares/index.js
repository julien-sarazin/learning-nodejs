module.exports = (api) => {
  console.log('initializing middlewares...');
  api.middlewares = {
    ensureUserName: require('./ensureUserName'),
    bodyParser: require('body-parser')
  }
};
