module.exports = (server) => {
    const env = process.env.NODE_ENV || 'dev';
    const path = './' + env + '.json';

    server.settings = require(path);
};