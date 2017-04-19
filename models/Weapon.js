const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const WeaponSchema = Schema({
    damage: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
});

WeaponSchema.plugin(timestamps);

module.exports = mongoose.model('Weapon', WeaponSchema);