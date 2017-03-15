const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.post('/login',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureFields(['email', 'password']),
        server.actions.auth.login
    );

    return router;
};