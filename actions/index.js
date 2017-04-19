module.exports = (server) => {
    server.actions = {
        bots: require('./bots')(server),
        weapons: require('./weapons')(server)
    };
};