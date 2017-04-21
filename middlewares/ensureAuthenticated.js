const jwt = require('jsonwebtoken');

module.exports = (server) => {
    const User = server.models.User;
    const salt = server.settings.security.salt;

    return (req, res, next) => {
        let encryptedToken = req.headers['authorization'];

        if (!encryptedToken)
            return unauthorized();

        jwt.verify(encryptedToken, salt, (err, token) => {
            if (err)
                return unauthorized();

            if (!token)
                return unauthorized();

            User.findById(token.userId, (err, user) => {
                if (err)
                    return unauthorized();

                if (!user)
                    return unauthorized();

                req.userId = token.userId;
                next();
            });
        });


        function unauthorized() {
            res.status(401).send();
        }
    };
};