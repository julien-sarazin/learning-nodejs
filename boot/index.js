module.exports = (server) => {
    require('./loadRoles')(server);
    require('./loadUser')(server);
};