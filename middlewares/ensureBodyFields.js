module.exports = (server) => {
    return (fields) => {
        fields = (fields instanceof Array) ? fields : [fields];

        return (req, res, next) => {
            var missings = [];

            fields.forEach((field) => {
                if (!req.body[field])
                    missings.push(field);
            });

            if (missings.length > 0)
                return res.status(400).send({
                    missings: missings
                });

            next();
        }
    };
};
