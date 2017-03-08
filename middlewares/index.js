module.exports = (api) => {
  console.log('initializing middlewares...');
  api.middlewares = {
    ensureBirthDate: require('./ensureBirthDate'),
    ensureUserName: require('./ensureUserName'),
    bodyParser: require('body-parser')
  }
};
