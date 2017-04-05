module.exports = (fields) => {
    fields = (fields instanceof Array) ? fields : [fields];

    return (req, res, next) => {
        if (!req.body) {
            return res.status(400).send();
        }

        const missings = [];
        for (let field of fields) {
            if (!req.body[field]) {
                missings.push(field);
            }
        }

        if (missings.length > 0) {
            return res.status(400).send('missing.fields: ' + missings.toString())
        }

        next();
    }
};