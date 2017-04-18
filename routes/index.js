module.exports = (server) => {
    const botsRoutes = require('./bots')(server);

    server.use('/bots', botsRoutes);
};