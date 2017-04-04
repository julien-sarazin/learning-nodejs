module.exports = (req, res, next) => {
    res.prepare = (code) => {
        return function(param) {
            if (code == 204 || code == 201) {
                param = null;
            }

            res.status(code).send(param);
        }
    };

    next();
};