const timestamps = require('mongoose-timestamps');

module.exports = (server) => {
    const Schema = server.mongoose.Schema;

    const TokenSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });

    TokenSchema.plugin(timestamps);

    return server.mongoose.model('Token', TokenSchema);
};