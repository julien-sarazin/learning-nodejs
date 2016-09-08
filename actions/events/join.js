module.exports = (server) => {
    const Event = server.models.Event;

    return (req, res, next) => {
        let userId = req.auth.userId;
        let user = req.auth.user;

        Event.findById(req.params.id, (err, event) => {
            if (err)
                return res.status(500).send(err);

            if (!event)
                return res.status(404).send('event not found');

            var eventId = event._id.toString();
            
            if (user.participations.indexOf(eventId) !== -1)
                return res.status(403).send('already a participant');
            
            user.participations.push(eventId);
            event.participants.push(userId);
            
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
