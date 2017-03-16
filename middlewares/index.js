module.exports = (server) => {
    server.use(require('./../middlewares/res'));
    server.middlewares = {
        bodyParser: require('body-parser'),
        ensureFields: require('./ensureFields'),
        ensureAuthenticated: require('./ensureAuthenticated')(server),
        ensureRights: require('./ensureRights')(server)
    };
};