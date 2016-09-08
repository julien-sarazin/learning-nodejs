module.exports = (server) => {
    return {
        create: require('./create')(server),
        list: require('./list')(server),
        show: require('./show')(server),
        remove: require('./remove')(server),
        update: require('./update')(server),
        join: require('./join')(server),
        leave: require('./leave')(server)
    };
};
