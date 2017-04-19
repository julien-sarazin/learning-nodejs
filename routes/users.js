const router = require('express').Router();

module.exports = (server) => {

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(server.models.User.schema),
        server.actions.users.create
    );

    router.get('/',
        server.actions.users.list
    );

    router.get('/:id',
        server.actions.users.show
    );

    router.put('/:id',
        server.middlewares.bodyParser.json(),
        server.actions.users.update
    );

    router.delete('/:id',
        server.actions.users.remove
    );

    return router;
};