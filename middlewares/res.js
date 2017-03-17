module.exports = (req, res, next) => {
    res.commit = (data) => {
        if (!data) {
            return res.status(204).send()
        }

        return res.send(data);
    };

    res.error = (error) => {
        if (error.code) {
            return res.status(error.code).send(error.message);
        }

        return res.status(500).send(error.toString())
    };

    next();
};