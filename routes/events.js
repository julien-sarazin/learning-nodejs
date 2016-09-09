const router = require('express').Router();

let eventRouter = (server) => {

    /**
     * @api {get} /events/
     * @apiGroup Events
     */
    router
        .get('/',
            server.actions.events.list)


        /**
         * @api {get} /events/{id}
         * @apiGroup Events
         */
        .get('/:id',
            server.actions.events.show
        )


        /**
         * @api {post} /events/
         * @apiParam {String} title     "Mandatory title"
         * @apiGroup Events
         */
        .post('/',
            server.middlewares.ensureAuthenticated,
            server.middlewares.bodyparser,
            server.middlewares.ensureBodyFields('title'),
            server.actions.events.create
        )


        /**
         * @api {post} /events/:id/join
         * @apiGroup Events
         */
        .post('/:id/join',
            server.middlewares.ensureAuthenticated,
            server.actions.events.join
        )
        /**
         * @api {post} /events/:id/leave
         * @apiGroup Events
         */
        .post('/:id/leave',
            server.middlewares.ensureAuthenticated,
            server.actions.events.leave
        )


        /**
         * @api {put} /events/{id}
         * @apiGroup Events
         */
        .put('/:id',
            server.middlewares.ensureAuthenticated,
            server.middlewares.bodyparser,
            server.actions.events.update
        )


        /**
         * @api {delete} /events/{id}
         * @apiGroup Events
         */
        .delete('/:id',
            server.actions.events.remove
        );

    return router;
}

module.exports = eventRouter;