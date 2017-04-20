module.exports = (requirements) => {
    return (req, res, next) => {
        if (!req.body)
            return res.status(400).send();

        if (requirements.constructor.name == 'Schema') {
            let schema = requirements;
            for (let property in schema.obj) {
                if (schema.obj[property].required) {
                    if (!req.body[property])
                        return res.status(400).send();
                }
            }
        }

        if (requirements.constructor.name == 'String')
            requirements = [requirements];

        if (requirements.constructor.name == 'Array') {
            for (let requirement of requirements) {
                if (!req.body[requirement]) {
                    return res.status(400).send();
                }
            }
        }

        next();
    }
};