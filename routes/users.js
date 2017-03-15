const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureFields(['name', 'email']),
        server.actions.users.create
    );

    router.get('/',
        server.actions.users.list);

    router.get('/:id',
        server.actions.users.show);

    router.put('/',
        server.middlewares.bodyParser.json(),
        server.actions.users.update);

    router.delete('/:id',
        server.actions.users.remove);

    return router;
};