const Sequelize = require('sequelize');

module.exports = (api) => {
    return sequelize.define('driver', {
        name: Sequelize.STRING
    });
};