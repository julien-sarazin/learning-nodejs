module.exports = (req, res, next) => {
    res.error = (error) => {
        if (error.code)
            return res.status(error.code).send(error.reason);

        return res.status(500).send(error);
    };

    res.created = () => {
        res.status(201).send();
    };

    res.noContent = () => {
        res.status(204).send();
    };

    next();
};