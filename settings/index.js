const DEFAULT_ENV = 'development';

module.exports = (server) => {
    let NODE_ENV = process.env.NODE_ENV || DEFAULT_ENV;
    server.settings = require('./settings.json')[NODE_ENV];
};
