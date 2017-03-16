module.exports = (server) => {
    const Schema = server.mongoose.Schema;

    const RoleSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        level: {
            type: Number,
            required: true
        }
    });

    return server.mongoose.model('Role', RoleSchema);
};