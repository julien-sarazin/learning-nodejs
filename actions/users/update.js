module.exports = function(server) {
    var User = server.models.User;

    return function(req, res, next) {
        delete req.body.password;
        delete req.body.activated;

        if (req.params.id !== req.auth.userId)
            return res.status(403).send('You are not allowed to update someone else attributes');

        User.findById(req.params.id, function(err, user) {
            if (!user)
                return res.status(404).send();

            User.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, data) {
                if (err)
                    return res.status(500).send(err);
                res.send(data);
            })
        });
    }
};
