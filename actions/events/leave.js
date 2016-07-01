module.exports = function(server) {
    var Event = server.models.Event;
    var index;

    return function(req, res, next) {

        Event.findById(req.params.id, function(err, event) {
            if (err)
                return res.status(500).send(err);

            var user = req.auth.user;

            if (user._id.toString() === event.creator.toString())
                return res.status(403).send('creator cannot leave his own event.');

            // checking participations
            var participations = user.participations.map(function(pObj) {
                return pObj.toString();
            });

            index = participations.indexOf(req.params.id);
            if (index === -1)
                return res.status(404).send('Participation not found');
            user.participations.splice(index, 1);

            // checking participants
            var participants = event.participants.map(function(pObj) {
                return pObj.toString();
            });

            var index = participants.indexOf(user._id.toString());
            if (index === -1)
                return res.status(404).send('Participation not found');
            event.participants.splice(index, 1);


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
