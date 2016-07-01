module.exports = function(server) {
    var Event = server.models.Event;

    return function(req, res, next) {
        var query = Event.find();

        query.exec(function(err, data) {
            if (err)
                return res.status(500).send(err);

            res.send(data);
        });
    }
};
