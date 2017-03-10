const Sequelize = require('sequelize');

module.exports = (api) => {
    return api.sequelize.define('ambulance', {
        model: Sequelize.STRING
    });
};