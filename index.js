const express = require('express');
const api = express();

require('./settings')(api);             console.log('initializing settings...');
require('./models')(api);               console.log('initializing models...');
require('./actions')(api);              console.log('initializing actions...');
require('./middlewares')(api);          console.log('initializing middlewares...');
require('./routes')(api);               console.log('initializing routes...');

require('./static')(api);               console.log('initializing static files...');

api.listen(api.settings.port);
console.log(`API listening on port ${api.settings.port}`);

require('./boot')(api);                 console.log('\n executing boot scripts...');
