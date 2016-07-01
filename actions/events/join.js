module.exports = function(server) {
    var Event = server.models.Event;
    var User = server.models.User;

    return function(req, res, next) {
        var userId = req.auth.userId;
        var user = req.auth.user;

        Event.findById(req.params.id, function(err, event) {
            if (err)
                return res.status(500).send(err);

            if (!event)
                return res.status(404).send('event not found');

            var eventId = event._id.toString();
            
            if (user.participations.indexOf(eventId) !== -1)
                return res.status(403).send('already a participant');
            
            user.participations.push(eventId);
            event.participants.push(userId);
            
            user.save(function(err, data) {
                if (err)
                    return res.status(500).send(err);

                event.save(function(err, data) {
                    if (err)
                        return res.status(500).send(err);
                    
                    return res.send(data);
                });
            });
        });
    }
};
