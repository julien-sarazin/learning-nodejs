module.exports = (server) => {
    server.use(server.middlewares.logger);
    server.use(server.middlewares.res);

    server.use('/bots', require('./bots')(server));
    server.use('/weapons', require('./weapons')(server));
    server.use('/users', require('./users')(server));
    server.use('/auth', require('./auth')(server));
};