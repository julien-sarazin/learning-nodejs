module.exports = (server) => {
    const Schema = server.models.mongoose.Schema;
    let Token = Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            expires: 3600,
            default: Date.now
        }
    });

    return server.models.mongoose.model('Token', Token);
};
