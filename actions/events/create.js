module.exports = (server) => {
    const Event = server.models.Event;
    const User = server.models.User;

    return (req, res, next) => {
        let event = new Event(req.body);
        event.creator = req.auth.userId;
        event.participants.push(req.auth.userId);

        event.save((err, data) =>{
            if (err) {
                return res.status(500).send(err);
            }

            User.findById(req.auth.userId, (err, user) => {
                if (err)
                    return res.status(500).send(err);

                user.events.push(data._id);
                user.participations.push(data._id);

                user.save((err, instance) => {
                    if (err)
                        return res.status(500).send(err);
                    res.send(data);
                });
            });
        });
    };
};
