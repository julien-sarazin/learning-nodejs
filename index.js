const express = require('express');
const server = express();

require('./settings')(server);              console.log('loading settings...');
require('./models')(server);                console.log('loading models...');
require('./middlewares')(server);           console.log('loading middlewares...');
require('./actions')(server);               console.log('loading actions...');
require('./routes')(server);                console.log('loading routes...');
require('./static')(server);                console.log('loading client...');

console.log(`Server listening on port ${server.settings.port}`);
server.listen(server.settings.port);


module.exports = server;