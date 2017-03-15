module.exports = (server) => {
    server.use('/users', require('./users')(server));
    server.use('/todos', require('./todos')(server));
};