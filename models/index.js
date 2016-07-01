var mongoose = require('mongoose');

module.exports = function(server) {
    server.models = server.models || {};
    server.models.mongoose = mongoose.connect(server.settings.db.mongo);

    server.models.Event = require('./Event')(server);
    server.models.User = require('./User')(server);
    server.models.Token = require('./Token')(server);
};
