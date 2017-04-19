module.exports = (server) => {
    server.middlewares = {
        bodyParser: require('body-parser'),
        ensureBotsModel: require('./ensureBotsModel'),
        ensureBodyFields: require('./ensureBodyFields')
    };
};