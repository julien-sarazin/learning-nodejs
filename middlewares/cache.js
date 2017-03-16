module.exports = (server) => {
    return {
        get,
        clean
    };

    function get(req, res, next) {
        const value = server.cache.get(req.originalUrl);
        if (value) {
            res.send(value)
        }
        next();
    }


    function clean(group) {
        return (req, res, next) => {
            server.cache.clean(group);
            next();
        }
    }
};