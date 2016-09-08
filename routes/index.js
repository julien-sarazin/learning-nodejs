const router = require('express').Router()

module.exports = (server) => {
    router.use('/users',  require('./users')(server));
    router.use('/events', require('./events')(server));
    router.use('/auth',   require('./auth')(server));

    server.use('/api', router);
};