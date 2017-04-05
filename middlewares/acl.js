module.exports = {
    ensure: (requirement) => {
        return (req, res, next) => {
            let userRole = req.role;

            if (typeof requirement == 'string') {
                if (userRole.name == requirement) {
                    return next();
                }

                return forbidden();
            }

            if (requirement instanceof Array) {
                let found = requirement.some((name) => {
                    return name == userRole.name
                });

                if (found) {
                    return next();
                }

                return forbidden();
            }

            if (typeof requirement == "number") {
                if (userRole.level <= requirement) {
                    return next();
                }

                return forbidden();
            }

            throw new Error('invalid requirement');

            function forbidden() {
                return res.status(403).send('not.enough.rights');
            }
        };
    }
};