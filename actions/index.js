module.exports = (server) => {
    server.actions = {
        users: require('./users')(server),
        todos: require('./todos')(server),
        auth: require('./auth')(server)
    }
};