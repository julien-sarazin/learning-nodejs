module.exports = (server) => {
    const Bot = server.models.Bot;

    return (req, res, next) => {
        Bot.findByIdAndUpdate(req.params.id,
            req.body,
            (err, instance) => {
            if (err)
                return res.status(500).send(err);

            if (!instance)
                return res.status(404).send();

            res.status(204).send();
        })
    }
};
