module.exports = (server) => {
    return {
        login: require('./login')(server)
    };
};