const timestamps = require('mongoose-timestamps');
const ttl = require('mongoose-ttl');

module.exports = (server) => {
    const Schema = server.mongoose.Schema;

    const TokenSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });

    TokenSchema.plugin(timestamps);
    TokenSchema.plugin(ttl, {ttl : '10s'});

    return server.mongoose.model('Token', TokenSchema);
};