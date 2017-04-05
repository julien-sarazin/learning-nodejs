const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

module.exports = (api) => {
    api.mongoose = mongoose.connect(api.settings.db.url);
    api.models = {
        User: require('./User')(api),
        Car: require('./Car')(api),
        Role: require('./Role')(api)
    };
};
