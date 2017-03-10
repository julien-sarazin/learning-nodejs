const Sequelize = require('sequelize');

module.exports = (api) => {
    return sequelize.define('ambulance', {
        model: Sequelize.STRING
    });
};