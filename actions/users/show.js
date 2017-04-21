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
            .then(res.send)
            .catch(res.error);

        function ensureOne(data) {
            return (data) ? data : Promise.reject({code: 404});
        }
    }
};
