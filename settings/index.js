module.exports = (api) => {
  console.log('loading settings...');
  api.settings = require('./settings.json');
};
