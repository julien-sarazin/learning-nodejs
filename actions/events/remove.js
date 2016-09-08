module.exports = (server) => {
    return (req, res, next) => {
        const Event = server.models.Event;
        Event.findByIdAndRemove(req.params.id, (err, data) => {
            if (err)
                return res.status(500).send(err);

            res.send(data);
        })
    };
};
