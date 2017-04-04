const express = require('express');
const api = express();

require('./settings')(api);

api.listen(api.settings.port);
console.log(`API listening on port ${api.settings.port}`);
