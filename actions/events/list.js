module.exports = (server) => {
    const Event = server.models.Event;

    return (req, res, next) => {
        var query = Event.find();

        query.exec((err, data) => {
            if (err)
                return res.status(500).send(err);

            res.send(data);
        });
    }
};
