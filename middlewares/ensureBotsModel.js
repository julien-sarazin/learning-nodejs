module.exports = (req, res, next) => {
    if (!req.body || !req.body.model)
        return res.status(400).send();

    next();
};