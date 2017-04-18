const mongoose = require('mongoose');
module.exports = (server) => {
    server.mongoose = mongoose.connect(server.settings.db.url);
    server.models = {
        Bot: require('./Bot')
    };
};