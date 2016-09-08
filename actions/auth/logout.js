module.exports = (server) => {
    const Token = server.models.AuthToken;

    return (req, res, next) => {
        Token.remove({userId: req.auth.userId}, (err, data) => {
            if (err)
                return res.status(500).send(err);
            res.send('logout succeeded');
        });
    };
};
