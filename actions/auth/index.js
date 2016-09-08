module.exports = (server) => {
    return {
        login: require('./login')(server),
        logout: require('./logout')(server),
    };
};
