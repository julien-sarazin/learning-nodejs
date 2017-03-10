module.exports = (api) => {
    api.actions = {
        auth: require('./auth')(api),
        users: require('./users/crud')(api),
        todos: require('./todos/crud')(api),
        drivers: require('./drivers/crud')(api)
    };
};
