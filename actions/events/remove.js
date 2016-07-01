module.exports = function(server) {
    return function(req, res, next) {
        var Event = server.models.Event;
        Event.findByIdAndRemove(req.params.id, function(err, data) {
            if (err)
                return res.status(500).send(err);

            res.send(data);
        })
    }
};
