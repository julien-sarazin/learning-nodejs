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
    health: {
        type: Number,
        default: 100
    }
});

BotSchema.plugin(timestamps);

module.exports = mongoose.model('Bot', BotSchema);