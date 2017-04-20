const jwt = require('jsonwebtoken');
const sha1 = require('sha1');

module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        const email = req.body.email;
        const password = sha1(req.body.password);

        User.findOne({
            email: email,
            password: password
        }, (err, user) => {
            if (err)
                return res.status(500).send(err);

            if (!user)
                return res.status(404).send();

            let token = { userId: user._id };
            let options = { expiresIn: '1h' };

            jwt.sign(token, server.settings.security.salt, options, (err, encryptedToken) => {
                if (err)
                    return res.status(500).send();

                res.send(encryptedToken);
            });
        });
    };
};