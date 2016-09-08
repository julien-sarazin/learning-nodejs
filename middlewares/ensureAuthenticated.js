const jwt = require('jsonwebtoken');

module.exports = (server) => {
    var Token = server.models.Token;
    var User = server.models.User;

    return (req, res, next) => {
        var token = req.headers.authorization;
        if (!token)
            return res.status(401).send('unauthorized');

        jwt.verify(token, server.settings.TOKEN_SECRET, (err, verified) => {
            if (!verified)
                return res.status(401).send('invalid token');

            Token.findById(verified.accessToken, (err, data) => {
                if (err)
                    return next(err);
                if (!data)
                    return res.status(401).send('invalid token');

                req.auth = req.auth || {};
                req.auth.userId = data.userId.toString();

                User.findById(data.userId, (err, user) => {
                    if (err)
                        return next(err);

                    if (!user)
                        return res.status(401).send('invalid token');

                    req.auth.user = user;
                    next();
                });
            });
        });
    }
};
