const jwt = require('jsonwebtoken');

module.exports = (api) => {
    const User = api.models.User;

    return (req, res, next) => {
        const encryptedToken = req.headers.authorization;

        if (!encryptedToken) {
            return unauthorized();
        }

        jwt.verify(encryptedToken, api.settings.security.secret, (err, token) => {
            if (err || !token || !token.userId) {
                return unauthorized();
            }

            User.findById(token.userId)
                .then(ensureOne)
                .then(authorize)
                .catch(unauthorized);

            function ensureOne(user) {
                return (user)? user : Promise.reject();
            }

            function authorize() {
                req.userId = token.userId;
                req.role = token.role;
                next();
            }
        });

        function unauthorized() {
            return res.status(401).send('unauthorized');
        }
    };
};
