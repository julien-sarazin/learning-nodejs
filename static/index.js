const express = require('express');

module.exports = (api) => {
    return api.use(express.static(__dirname))
};