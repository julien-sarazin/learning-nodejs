const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
    const schema = new Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        tasks: [{
            type: Schema.Types.ObjectId,
            ref: 'Todo'
        }]
    });

    schema.plugin(timestamps);
    return api.mongoose.model('User', schema);
};
