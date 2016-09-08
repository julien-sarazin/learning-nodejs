module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        delete req.body.password;
        delete req.body.activated;

        if (req.params.id !== req.auth.userId)
            return res.status(403).send('You are not allowed to update someone else attributes');

        User.findById(req.params.id, (err, user) => {
            if (!user)
                return res.status(404).send();

            User.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, data) => {
                if (err)
                    return res.status(500).send(err);
                res.send(data);
            })
        });
    };
};
