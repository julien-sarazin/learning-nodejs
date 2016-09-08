const sha1 = require('sha1');

module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        req.body.password = sha1(req.body.password);
        User.findOne()
            .where('email', req.body.email)
            .exec((err, data) => {
                if (err)
                    return res.status(500).send(err);

                if (data)
                    return res.status(401).send('email.already.exists')

                let user = new User(req.body);
                user.save((err, data) => {
                    if (err)
                        return res.status(500).send(err);
                    res.send(data);
                });
            });
    };
};
