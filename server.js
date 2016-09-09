const express = require('express');
let server;
module.exports = server = express();

require('./settings')(server);    // Load settings
require('./models')(server);      // Load models + connect to the DB
require('./middlewares')(server); // load middleswares
require('./actions')(server);     // Load actions
require('./routes')(server);      // Load routes

require('./explorer')(server);    // Load API Explorer (Swagger UI)

console.log('Server listening on port', server.settings.port);
server.listen(server.settings.port); // Start the server