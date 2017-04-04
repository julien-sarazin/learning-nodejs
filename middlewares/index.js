module.exports = (api) => {
    api.middlewares = {
        bodyParser: require('body-parser'),
        logger: require('./logger'),
        ensureUserName: (req, res, next) => {
            if (!req.body || !req.body.name) {
                return res.status(400).send('missing.name');
            }

            next();
        }
    };
};
