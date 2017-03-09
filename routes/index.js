module.exports = (api) => {
    api.use(api.middlewares.logger);
    api.use('/auth', require('./auth')(api));
    api.use('/users', require('./users')(api));
    api.use('/todos', require('./todos')(api));
};
