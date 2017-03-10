const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
    const schema = new Schema({
        title: {
            type: String
        }
    });

    schema.plugin(timestamps);
    return api.mongoose.model('Role', schema);
}
