module.exports = (server) => {
    server.middlewares = {
        bodyParser: require('body-parser'),
        ensureBodyFields: require('./ensureBodyFields'),
        ensureAuthenticated: require('./ensureAuthenticated')(server)
    };
};