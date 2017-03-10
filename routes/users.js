const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
        api.middlewares.cache.get,
        api.actions.users.findAll);

    router.get('/:id',
        api.actions.users.findOne);

    router.post('/',
        api.middlewares.cache.clean('User'),
        api.middlewares.bodyParser.json(),
        api.actions.users.create);

    router.put('/:id',
        api.middlewares.bodyParser.json(),
        api.actions.users.update);

    router.delete('/:id',
        api.actions.users.remove);

    return router;
}
