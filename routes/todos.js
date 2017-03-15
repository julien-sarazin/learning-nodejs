const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.post('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureFields('userId'),
        server.actions.todos.create
    );

    router.get('/',
        server.middlewares.ensureAuthenticated,
        server.actions.todos.list);

    router.get('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.todos.show);

    router.put('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.actions.todos.update);

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.actions.todos.remove);

    return router;
};