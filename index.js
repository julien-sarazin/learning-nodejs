const express = require('express');
const server = express();

require('./settings')(server);
require('./models')(server);
require('./middlewares')(server);
require('./actions')(server);
require('./routes')(server);

console.log(`server listening on port ${server.settings.port}`);
server.listen(server.settings.port);