module.exports = function(server) {
    var Token = server.models.AuthToken;

    return function(req, res, next) {
        Token.remove({userId: req.auth.userId}, function(err, data) {
            if (err)
                return res.status(500).send(err);
            res.send('logout succeeded');
        });
    }
}
