module.exports = (server) => {
    server.use('/bots', require('./bots')(server));
    server.use('/weapons', require('./weapons')(server));
    server.use('/users', require('./users')(server));
};