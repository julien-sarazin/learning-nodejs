const path = require('path');
const express = require('express');
const swagger_descriptor = require('./swagger.json');

module.exports = (server) => {
    let swaggerPath = path.join(__dirname, './swagger');

    server.use('/explorer', express.static(swaggerPath));
    server.get('/explorer/data', (req, res, next) => {
        res.send(swagger_descriptor);
    });
};