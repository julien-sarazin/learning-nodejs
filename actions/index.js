<<<<<<< Updated upstream
module.exports = (api) => {
    api.actions = {
        users: require('./users')(api),
        cars: require('./cars')(api),
        auth: require('./auth')(api)
    };
};
=======
module.exports = (server) => {
    server.actions = {
        bots: require('./bots')(server)
    };
};
>>>>>>> Stashed changes
