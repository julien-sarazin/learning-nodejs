module.exports = (server) => {
    server.use('/users', require('./users')(server))
};