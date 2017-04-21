const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const BotSchema = Schema({
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
    },
    weapons: [{
        type: Schema.Types.ObjectId,
        ref: 'Weapon'
    }],
    slots: {
        type: Number,
        default: 2
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

BotSchema.plugin(timestamps);

module.exports = mongoose.model('Bot', BotSchema);