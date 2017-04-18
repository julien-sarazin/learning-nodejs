const mongoose = require('mongoose');
<<<<<<< Updated upstream
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
=======

module.exports = (server) => {
    server.mongoose = mongoose.connect(server.settings.db.url);
    server.models = {
        Bot: require('./Bot')
    };
};
>>>>>>> Stashed changes
