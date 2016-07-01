var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(server) {
    router

        .get('/',
            server.actions.events.list
        )

        .get('/:id',
            server.actions.events.show
        )

        .post('/',
            server.middlewares.ensureAuthenticated,
            server.middlewares.bodyparser,
            server.middlewares.ensureBodyFields('title'),
            server.actions.events.create
        )

        .post('/:id/join',
            server.middlewares.ensureAuthenticated,
            server.actions.events.join
        )

        .post('/:id/leave',
            server.middlewares.ensureAuthenticated,
            server.actions.events.leave
        )
        
        .put('/:id',
            server.middlewares.ensureAuthenticated,
            server.middlewares.bodyparser,
            server.actions.events.update
        )

        .delete('/:name',
            server.actions.events.remove
        );

    return router;
};
