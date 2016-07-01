var router = require('express').Router();
module.exports = function(server){
  router
  .post('/',
  server.middlewares.ensureAuthenticated,
  server.middlewares.bodyparser,
  server.actions.jobs.create)

  .get('/:id', server.actions.jobs.show)
  .get('/', server.actions.jobs.list)
  .get('/ownedBy/:owner', server.actions.jobs.ownedBy)

  .put('/:id',
  server.middlewares.bodyparser,
  server.actions.jobs.update)

  .delete('/:id',
  server.actions.jobs.remove)

  return router;
}
