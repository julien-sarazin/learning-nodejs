const mongoose = require('mongoose');

module.exports = (api) => {
    api.mongoose = mongoose.connect(api.settings.db.url);
    api.models = {
        User: require('./User')(api),
        Car: require('./Car')(api)
    }
};
