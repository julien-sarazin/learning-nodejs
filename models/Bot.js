const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');

const BotSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

BotSchema.plugin(timestamps);

module.exports = mongoose.model('Bot', BotSchema);