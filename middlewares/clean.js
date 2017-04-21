module.exports = (fields) => {
    return (req, res, next) => {
        for (let field of fields) {
            if (req.body[field]) {
                return res.status(403).send();
            }
        }

        next();
    };
};