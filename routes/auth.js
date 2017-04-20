const router = require('express').Router();

module.exports = (server) => {
    router.post('/login',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(['email', 'password']),
        server.actions.auth.login
    );

    return router;
};