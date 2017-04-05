module.exports = (api) => {
    api.middlewares = {
        bodyParser: require('body-parser'),
        logger: require('./logger'),
        res: require('./res'),
        isAuthenticated: require('./isAuthenticated')(api),
        ensureFields: require('./ensureFields'),
        acl: require('./acl')
    };
};
