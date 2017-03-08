const express = require('express');
const api = express();

require('./settings')(api);       // Load settings;
require('./middlewares')(api);    // Load middlewares;
require('./models')(api);         // Load models;
require('./actions')(api);        // Load actions;
require('./routes')(api);         // Load routes;

console.log(`Api ready! \nListening on port ${api.settings.port}`)
api.listen(api.settings.port);
