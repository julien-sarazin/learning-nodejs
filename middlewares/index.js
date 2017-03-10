module.exports = (api) => {
    api.middlewares = {
        ensureAuthenticated: require('./ensureAuthenticated')(api),
        logger: require('./logger'),
        bodyParser: require('body-parser'),
        ensureRole: require('./ensureRole')(api),
        cache: require('./cache')(api)
    };
};
