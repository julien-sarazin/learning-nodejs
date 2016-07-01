module.exports = function(server) {
    var Event = server.models.Event;
    var User = server.models.User;

    return function(req, res, next) {
        var event = new Event(req.body);
        event.creator = req.auth.userId;
        event.participants.push(req.auth.userId);

        event.save(function(err, data) {
            if (err) {
                return res.status(500).send(err);
            }

            User.findById(req.auth.userId, function(err, user) {
                if (err)
                    return res.status(500).send(err);

                user.events.push(data._id);
                user.participations.push(data._id);

                user.save(function(err, instance) {
                    if (err)
                        return res.status(500).send(err);
                    res.send(data);
                });
            });
        });
    }
};
