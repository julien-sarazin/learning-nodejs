module.exports = (server) => {
    const Event = server.models.Event;

    return (req, res, next) => {
        let id = req.params.id;

        Event.findByIdAndUpdate(id, {$set: req.body}, (err, event) => {
            if (err)
                return res.status(500).send(err);
            res.send(event);
        });
    };
};
