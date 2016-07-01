module.exports = function(server) {
    return {
        create: require('./create')(server),
        list: require('./list')(server),
        show: require('./show')(server),
        update: require('./update')(server),
        me: require('./me')(server)
    }
};
