const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.sequelize.define('driver', {
        name: Sequelize.STRING
    });
};