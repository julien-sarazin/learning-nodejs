const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
        api.middlewares.cache.get,
        api.actions.todos.findAll);

    router.get('/:id',
        api.actions.todos.findOne);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.middlewares.ensureAuthenticated,
        api.actions.todos.create);

    router.put('/:id',
        api.middlewares.bodyParser.json(),
        api.actions.todos.update);

    router.delete('/:id',
        api.actions.todos.remove);

    router.post('/:id/assign',
        api.middlewares.bodyParser.json(),
        api.middlewares.ensureAuthenticated,
        api.middlewares.ensureRole('Admin'),
        api.actions.todos.assign
    )

    return router;
}
