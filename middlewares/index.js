module.exports = (api) => {
    console.log('initializing middlewares...');
    api.middlewares = {
        ensureAuthenticated: require('./ensureAuthenticated'),
        logger: require('./logger'),
        bodyParser: require('body-parser')
    };
};
