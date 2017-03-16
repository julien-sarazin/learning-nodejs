const express = require('express');
const server = express();

// optional
require('./utils')(server);                 console.log('loading utils..');
require('./boot')(server);                  console.log('loading initial boot scripts..');

// mandatory
require('./settings')(server);              console.log('loading settings..');
require('./models')(server);                console.log('loading models..');
require('./middlewares')(server);           console.log('loading middlewares..');
require('./actions')(server);               console.log('loading actions..');
require('./routes')(server);                console.log('loading routes..');

console.log(`server listening on port ${server.settings.port}`);
server.listen(server.settings.port);