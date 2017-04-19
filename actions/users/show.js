module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        User.findById(req.params.id, (err, instance) => {
            if (err)
                return res.status(500).send(err);

            if (!instance)
                return res.status(404).send();

            res.send(instance);
        });
    }
};
