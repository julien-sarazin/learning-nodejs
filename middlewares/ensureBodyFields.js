module.exports = (schema) => {
    return (req, res, next) => {
        if (!req.body)
            return res.status(400).send();

        for (let property in schema.obj) {
            if (schema.obj[property].required) {
                if (!req.body[property])
                    return res.status(400).send();
            }
        }

        next();
    }
};