module.exports = (server) => {
    return (req, res, next) => {
        const User = server.models.User;

        User.findById(req.params.id, (err, data) => {
            if (err)
                return res.status(500).send(err);
            if (!data)
                return res.status(404).send();

            res.send(data);
        });
    };
};
