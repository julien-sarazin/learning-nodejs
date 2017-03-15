module.exports = (fields) => {
    fields = (fields instanceof Array) ? fields : [fields];

    return (req, res, next) => {
        let missings = [];
        fields.forEach((field) => {
            if (!req.body[field]) {
                missings.push(field)
            }
        });

        if (missings.length > 0) {
            return res.status(400).send('missing.fields: ' + missings.toString())
        }

        next();
    }
};