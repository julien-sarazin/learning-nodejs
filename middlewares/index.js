module.exports = function(server){
  server.middlewares = server.middlewares || {};
  server.middlewares.bodyparser = require('body-parser').json();
  server.middlewares.ensureBodyFields = require('./ensureBodyFields');
  server.middlewares.ensureAuthenticated = require('./ensureAuthenticated')(server);
}
