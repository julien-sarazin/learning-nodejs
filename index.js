const express = require('express');
const api = express();

require('./settings')(api);
require('./models')(api);
require('./actions')(api);
require('./middlewares')(api);
require('./routes')(api);

api.listen(api.settings.port);
console.log(`API listening on port ${api.settings.port}`);
