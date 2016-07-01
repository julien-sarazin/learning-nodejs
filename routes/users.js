var router = require('express').Router();

module.exports = function(server) {
    router
        .get('/',
            server.actions.users.list
        )

        .get('/:id',
            server.actions.users.show
        )

        .post('/',
            server.middlewares.bodyparser,
            server.middlewares.ensureBodyFields(['email', 'password']),
            server.actions.users.create
        )

        .put('/:id',
            server.middlewares.ensureAuthenticated,
            server.middlewares.bodyparser,
            server.actions.users.update
        );

    return router;
};
