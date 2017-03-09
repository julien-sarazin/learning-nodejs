const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (api) => {
    const User = api.models.User;
    const Token = api.models.Token;

    return function login(req, res, next) {
        // #1 trying to find the user
        User.findOne({
            email: req.body.email,
            password: sha1(req.body.password)
        }, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            }

            // #2 no user found with this credentials. Forbidden.
            if (!user) {
                return res.status(401).send('invalid.credentials');
            }

            // #3 starting token creation.
            var token = new Token();
            token.userId = user._id.toString();

            // #4 persist the token into the database.
            token.save((err, token) => {
                if (err) {
                    return res.status(500).send(err);
                }

                // #5 encrypting the token with JWT convention.
                jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60) * 24, // 1 day.
                        tokenId: token._id.toString() // using the ID of the token has identifier.
                    },
                    api.settings.security.salt,
                    {},
                    (err, encryptedToken) => {
                        if (err) {
                            return res.status(500).send(err);
                        }

                        // #6 sending the encrypted token.
                        return res.send(encryptedToken);
                    }
                );
            });
        });
    }
};