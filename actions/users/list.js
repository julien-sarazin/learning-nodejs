module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        User.find((err, instances) => {
            if (err)
                return res.status(500).send(err);

            res.send(instances);
        });
    }
};
