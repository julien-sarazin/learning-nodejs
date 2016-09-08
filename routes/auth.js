const router = require('express').Router();

let authenticationRouter = (server) => {
    router
        .post('/login',
            server.middlewares.bodyparser,
            server.middlewares.ensureBodyFields(['email', 'password']),
            server.actions.auth.login
        )

        .post('/logout',
            server.middlewares.ensureAuthenticated,
            server.actions.auth.logout
        );

    return router;
}

module.exports = authenticationRouter;