module.exports = (server) => {
    const Schema = server.models.mongoose.Schema;
    let EventSchema = Schema({
        title: {
            type: String,
            required: true
        },
        description: String,
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        participants: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    });

    return server.models.mongoose.model('Event', EventSchema);
};
