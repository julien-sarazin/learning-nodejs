module.exports = (req , res, next) => {
    if (!req.header || !req.headers.authorization) {
        return res.status(401).send();
    }

    return next();
};