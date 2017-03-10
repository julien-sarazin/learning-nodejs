const router = require('express').Router();

module.exports = (api) => {
    router.get('/',
        api.actions.drivers.findAll);

    router.get('/:id',
        api.actions.drivers.findOne);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.actions.drivers.create);

    router.put('/:id',
        api.middlewares.bodyParser.json(),
        api.actions.drivers.update);

    router.delete('/:id',
        api.actions.drivers.remove);

    return router;
}
