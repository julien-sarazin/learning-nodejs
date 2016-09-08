module.exports = (server) => {
    let User = server.models.User;

    return (req, res, next) => {
        User.find((err, data) => {
            if (err)
                return res.status(500).send(err);

            res.send(data);
        });
    };
};
