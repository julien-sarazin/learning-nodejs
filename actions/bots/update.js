module.exports = (server) => {
    const Bot = server.models.Bot;


    return (req, res, next) => {

        Bot.findById(req.params.id)
            .then(ensureOne)
            .then(ensureLoggedUserIsOwner)
            .then(update)
            .then(respond)
            .catch(error);

        function ensureOne(data) {
            return (data) ? data : Promise.reject({code: 404});
        }

        function ensureLoggedUserIsOwner(bot) {
            return (bot.user == req.userId) ? bot : Promise.reject({code: 403});
        }

        function update(bot) {
             return Bot.update({_id: bot._id}, req.body)
        }

        function respond() {
            res.status(204).send()
        }

        function error(reason) {
            if (reason.code)
                return res.status(reason.code).send(reason.message);

            return res.status(500).send(reason);
        }

    }
};
