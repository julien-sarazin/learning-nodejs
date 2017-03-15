const timestamps = require('mongoose-timestamps');

module.exports = (server) => {
    const Schema = server.mongoose.Schema;
    const UserSchema = new Schema({
        name: {
            type: String,
            default: 'unknown'
        },
        email: {
            type: String,
            required: true
        },

        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Todo'
            }
        ]
    });

    UserSchema.plugin(timestamps);
    return server.mongoose.model('User', UserSchema);
};