module.exports = (server) => {
    const Event = server.models.Event;

    return (req, res, next) => {
        Event.findById(req.params.id, (err, event) => {
            if (err)
                return res.status(500).send(err);

            var user = req.auth.user;

            if (user._id.toString() === event.creator.toString())
                return res.status(403).send('creator cannot leave his own event.');

            var participations = user.participations.map((pObj) => {
                return pObj.toString();
            });

            index = participations.indexOf(req.params.id);
            if (index === -1)
                return res.status(404).send('Participation not found');

            user.participations.splice(index, 1);

            let participants = event.participants.map((pObj) => {
                return pObj.toString();
            });

            let index = participants.indexOf(user._id.toString());
            if (index === -1)
                return res.status(404).send('Participation not found');

            event.participants.splice(index, 1);


            user.save((err, data) => {
                if (err)
                    return res.status(500).send(err);

                event.save((err, data) => {
                    if (err)
                        return res.status(500).send(err);

                    return res.send(data);
                });
            });
        });
    };
};
