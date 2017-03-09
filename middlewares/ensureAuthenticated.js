const jwt = require('jsonwebtoken');

module.exports = (api) => {
    const Token = api.models.Token;

    return (req, res, next) => {
        //#1 Verify authorization header exists.
        if (!req.headers || !req.headers.authorization) {
            return res.status(401).send('authentication.required');
        }

        const encryptedToken = req.headers.authorization;

        // #2 Verify the token is valid
        jwt.verify(encryptedToken, api.settings.security.salt, null, (err, decryptedToken) => {
            if (err) {
                return res.status(401).send('invalid.token');
            }

            Token.findById(decryptedToken.tokenId, (err, token) => {
                if (err) {
                    return res.status(401).send('invalid.token');
                }

                if (!token) {
                    return res.status(401).send('authentication.expired');
                }

                req.userId = token.userId;
                return next();
            });
        });
    };
};