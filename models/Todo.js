const timestamps = require('mongoose-timestamps');

module.exports = (server) => {
    const Schema = server.mongoose.Schema;

    const TodoSchema = new Schema({
        title: String,
        dueDate: Date,

        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        assigned: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });

    TodoSchema.plugin(timestamps);

    return server.mongoose.model('Todo', TodoSchema);
};