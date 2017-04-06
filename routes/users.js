const router = require('express').Router();

module.exports = (api) => {

    router.get('/', api.actions.users.list);
    router.get('/:id', api.actions.users.show);

    router.post('/',
        api.middlewares.bodyParser.json(),
        api.middlewares.ensureFields(['email', 'password']),
        api.actions.users.create);

    router.put('/:id',
        api.middlewares.bodyParser.json(),
        api.actions.users.update);

    router.delete('/:id', api.actions.users.remove);

    router.put('/:id/assign/:roleId',
        api.middlewares.isAuthenticated,
        api.middlewares.acl.ensure(1),
        api.actions.users.assign
    );

    return router;
};
