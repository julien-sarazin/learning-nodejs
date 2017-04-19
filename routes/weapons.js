const router = require('express').Router();

module.exports = (server) => {

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(server.models.Weapon.schema),
        server.actions.weapons.create
    );

    router.get('/',
        server.actions.weapons.list
    );

    router.get('/:id',
        server.actions.weapons.show
    );

    router.put('/:id',
        server.middlewares.bodyParser.json(),
        server.actions.weapons.update
    );

    router.delete('/:id',
        server.actions.weapons.remove
    );

    return router;
};