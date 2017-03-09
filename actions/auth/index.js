module.exports = (api) => {
    return {
        login: require('./login')(api),
        logout: require('./logout')(api)
    };
};