module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        User.findByIdAndUpdate(req.userId, req.body)
            .then(respond)
            .catch(error);


        function respond() {
            res.status(204).send()
        }

        function error(error) {
            if (error.code)
                return res.status(code).send(error.reason);

            res.status(500).send();
        }
    };
};
