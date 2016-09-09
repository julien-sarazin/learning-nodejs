const router = require('express').Router();

module.exports = (server) => {
    router
    /**
     * @api {get} /users Request User information
     * @apiName CreateUser
     * @apiGroup Users
     */
        .get('/',
            server.actions.users.list
        )

        /**
         * @api {get} /users/{id} Request User information
         * @apiName CreateUser
         * @apiGroup Users
         *
         * @apiParam
         */
        .get('/:id',
            server.actions.users.show
        )

        /**
         * @api {post} /users/
         * @apiParam {String} email     "Mandatory email"
         * @apiParam {String} password  "Mandatory password"
         * @apiGroup Users
         */
        .post('/',
            server.middlewares.bodyparser,
            server.middlewares.ensureBodyFields(['email', 'password']),
            server.actions.users.create
        )

        /**
         * @api {put} /users/{id} Request User information
         * @apiName CreateUser
         * @apiGroup Users
         */
        .put('/:id',
            server.middlewares.ensureAuthenticated,
            server.middlewares.bodyparser,
            server.actions.users.update
        );

    return router;
};