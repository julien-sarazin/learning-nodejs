const mongoose = require('mongoose');

const Bot = mongoose.model('Bot', {
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    }
});

module.exports = Bot;