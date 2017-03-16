const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.post('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights('todos.create'),
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureFields('title'),
        server.middlewares.cache.clean('todos'),
        server.actions.todos.create
    );

    router.get('/',
        server.middlewares.cache.get,
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

    router.put('/:id/assign/:assignedId',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights('todos.assign'),
        server.actions.todos.assign);

    return router;
};