module.exports = (server) => {
    const Event = server.models.Event;

    return (req, res, next) => {
        let id = req.params.id;

        Event.findById(id, (err, data) => {
            if (err)
                return res.status(500).send(err);
            if (!data)
                return res.status(404).send('event not found');
            res.send(data);
        });
    };
};
