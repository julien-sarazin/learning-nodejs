const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');

const BotSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    model: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    age: {
        type: Number,
        required: true
    }
});

BotSchema.plugin(timestamps);

module.exports = mongoose.model('Bot', BotSchema);