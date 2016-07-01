var router = require('express').Router();
module.exports = function(server){
  router
  .post('/login',
  server.middlewares.bodyparser,
  server.middlewares.ensureBodyFields(['email', 'password']),
  server.actions.auth.login)

  .post('/logout',
  server.middlewares.ensureAuthenticated,
  server.actions.auth.logout)

  return router;
};
