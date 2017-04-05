module.exports = (req, res, next) => {
    res.prepare = (code) => {
        return function(param) {
            if (code == 204 || code == 201) {
                param = null;
            }

            res.status(code).send(param);
        }
    };

    res.error = (error) => {
        if (error && error.code && error.reason) {
            return res.status(error.code).send(error.reason);
        }

        return res.status(500).send();
    };

    next();
};