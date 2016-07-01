module.exports = function(server) {
    var User = server.models.User;

    return function(req, res, next) {
        User.find(function(err, data) {
            if (err)
                return res.status(500).send(err);

            res.send(data);
        });
    }
};
