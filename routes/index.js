module.exports = (api) => {
    console.log('initializing routes...');
    api.use('/users', require('./users')(api));
    api.use('/todos', require('./todos')(api));
};
