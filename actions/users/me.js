module.exports = function(server) {
    var User = server.models.User;

    return function(req, res, next) {
        var query = User.findById(req.auth.userId)
            .populate('events')
            .populate('participations');

        query.exec(function(err, data) {
            if (err)
                return res.status(500).send(err);
            res.send(data);
        });
    }
};
