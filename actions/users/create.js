const sha1 = require('sha1');

module.exports = (server) => {
    const User = server.models.User;

    return (req, res) => {
        User.findOne({
            email: req.body.email
        }, (err, user) => {
            if (err)
                return res.status(500).send(err);

            if (user)
                return res.status(403).send();

            req.body.password = sha1(req.body.password);

            new User(req.body)
                .save((err, instance) => {
                    if (err)
                        return res.status(500).send(err);
                    res.status(201).send();
                });
        });
    };
};