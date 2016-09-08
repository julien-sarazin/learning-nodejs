const jwt = require('jsonwebtoken');
const sha1 = require('sha1');

module.exports = (server) => {
    const User = server.models.User;
    const Token = server.models.Token;

    return (req, res, next) => {
        let email = req.body.email;
        let password = sha1(req.body.password);

        User.findOne({email: email, password: password}, (err, user) => {
            if (err)
                return res.status(500).send(err);
            if (!user)
                return res.status(422).send('invalid credentials');

            // Authentication succeeded.
            new Token({userId: user._id}).save((err, token) => {
                if (err)
                    return res.status(500).send(err);

                let accessToken = jwt.sign({accessToken: token._id}, server.settings.TOKEN_SECRET); // encrypt the access token created from the database.
                res.send(accessToken);
            });
        });
    };
};
