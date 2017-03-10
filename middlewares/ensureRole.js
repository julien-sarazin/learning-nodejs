module.exports = (api) => {
    const User = api.models.User;
    const Role = api.models.Role;

    return (role) => {
        return (req, res, next) => {
            // 1. Find the user
            User.findById(req.userId, (err, user) => {
                if (err) {
                    return res.status(500).send();
                }
                // 2. Find the role attached to the user.
                Role.findById(user.role, (err, instance) => {
                    if (err) {
                        return res.status(500).send();
                    }

                    // 3. ensure the role is the same than the one request on parameter.
                    if (instance.title != role) {
                        return res.status(403).send('not.enough.rights');
                    }

                    return next();
                })
            });
        }
    }
};