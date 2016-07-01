module.exports = function(server) {
    var Event = server.models.Event;

    return function(req, res, next) {
        var id = req.params.id;

        Event.findByIdAndUpdate(id, {$set: req.body}, function(err, event) {
            if (err)
                return res.status(500).send(err);
            res.send(event);
        });
    }
};
