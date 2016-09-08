module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        var query = User.findById(req.auth.userId)
            .populate('events')
            .populate('participations');

        query.exec((err, data) => {
            if (err)
                return res.status(500).send(err);
            res.send(data);
        });
    };
};
