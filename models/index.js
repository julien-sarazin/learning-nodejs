const mongoose = require('mongoose');
const Promise = require('bluebird');

module.exports = (api) => {
    api.mongoose = mongoose.connect(api.settings.db.url);
    api.mongoose.promise = Promise;
    api.models = {
        User: require('./User')(api),
        Todo: require('./Todo')(api),
        Token: require('./Token')(api),
        Role: require('./Role')(api)
    };
};
