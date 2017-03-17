module.exports = (server) => {
    const loadRoles = require('./loadRoles');
    const loadUser  = require('./loadUser');

    return loadRoles(server)
        .then(loadUser.bind(null, server))
};