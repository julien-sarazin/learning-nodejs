module.exports = (server) => {
    return server.mongoose.model('User', {
        name: String
    });
};