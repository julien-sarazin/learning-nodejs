var express = require('express');
var server = express();

require('./settings')(server);    // Load settings
require('./models')(server);      // Load models + connect to the DB
require('./middlewares')(server); // Load middlewares
require('./actions')(server);     // Load actions
require('./routes')(server);      // Load routes + apply middlewares

console.log('Server listening on port', server.settings.port);
server.listen(server.settings.port); // Start the server
