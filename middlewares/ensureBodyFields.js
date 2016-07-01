module.exports = function(server) {
    return function(fields) {
        fields = (fields instanceof Array) ? fields : [fields];

        return function(req, res, next) {
            var missings = [];

            fields.forEach(function(field) {
                if (!req.body[field])
                    missings.push(field);
            });

            if (missings.length > 0)
                return res.status(400).send({
                    missings: missings
                });

            next();
        }
    }
}
