<<<<<<< Updated upstream
module.exports = (api) => {
    api.middlewares = {
        bodyParser: require('body-parser'),
        logger: require('./logger'),
        res: require('./res'),
        isAuthenticated: require('./isAuthenticated')(api),
        ensureFields: require('./ensureFields'),
        acl: require('./acl'),
        cache: require('./cache')
    };
};
=======
module.exports = (server) => {
    server.middlewares = {
        bodyParser: require('body-parser')
    };
};
>>>>>>> Stashed changes
