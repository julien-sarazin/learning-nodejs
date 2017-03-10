const Schema = require('mongoose').Schema;
const timestamps = require('mongoose-timestamps');

module.exports = (api) => {
    const schema = new Schema({
        title: {
            type: String,
            required: true
        },
        dueDate: {
            type: Date,
            required: false
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        assigned: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });

    schema.plugin(timestamps);
    return api.mongoose.model('Todo', schema);
}
