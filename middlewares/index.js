module.exports = (server) => {
    server.middlewares = {
        bodyParser: require('body-parser'),
        ensureFields: require('./ensureFields'),
        ensureAuthenticated: require('./ensureAuthenticated')(server)
    };
};