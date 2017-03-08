const mongoose = require('mongoose');

module.exports = (api) => {
  console.log(`connecting to database: ${api.settings.db.url}`);
  api.mongoose = mongoose.connect(api.settings.db.url);
  console.log('initializing models...')

  api.models = {
    User: require('./User')(api),
    Todo: require('./Todo')(api)
  };
};
