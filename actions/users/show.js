module.exports = (server) => {
    const User = server.models.User;

    return (req, res, next) => {
        User.findById(req.params.id)
            .populate({
                path: 'bots',
                populate: {
                    path: 'weapons'
                }
            })
            .then(ensureOne)
            .then(respond)
            .catch(error);

        function ensureOne(data) {
            return (data) ? data : Promise.reject({code: 404});
        }

        function respond(data) {
            return res.send(data);
        }

        function error(error) {
            if (error.code) {
                return res.status(error.code).send(error.reason);
            }

            return res.status(500).send(error)
        }
    }
};
