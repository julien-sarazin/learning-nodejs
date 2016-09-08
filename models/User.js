module.exports = (server) => {
    const Schema = server.models.mongoose.Schema;
    let UserSchema = Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        events: [{
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }],
        participations: [{
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }]
    });

    return server.models.mongoose.model('User', UserSchema);
};