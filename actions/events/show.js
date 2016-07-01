module.exports = function(server) {
    var Event = server.models.Event;

    return function(req, res, next) {
        var id = req.params.id;

        Event.findById(id, function(err, data) {
            console.log('err:', err);
            if (err)
                return res.status(500).send(err);
            if (!data)
                return res.status(404).send('event not found');
            res.send(data);
        });
    }
};
