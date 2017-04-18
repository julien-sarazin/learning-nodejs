const express = require('express');
<<<<<<< Updated upstream
const api = express();

require('./settings')(api);             console.log('initializing settings...');
require('./models')(api);               console.log('initializing models...');
require('./actions')(api);              console.log('initializing actions...');
require('./middlewares')(api);          console.log('initializing middlewares...');
require('./routes')(api);               console.log('initializing routes...');

require('./static')(api);               console.log('initializing static files...');

api.listen(process.env.PORT);
console.log(`API listening on port ${process.env.PORT}`);

require('./boot')(api);                 console.log('\n executing boot scripts...');
=======
const server = express();

require('./settings')(server);              console.log('loading settings...');
require('./models')(server);                console.log('loading models...');
require('./middlewares')(server);           console.log('loading middlewares...');
require('./actions')(server);               console.log('loading actions...');
require('./routes')(server);                console.log('loading routes...');

console.log(`Server listening on port ${server.settings.port}`);
server.listen(server.settings.port);

>>>>>>> Stashed changes
