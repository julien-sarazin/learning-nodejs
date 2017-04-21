module.exports = (server) => {
    const Bot = server.models.Bot;
    const Weapon = server.models.Weapon;
    const User = server.models.User;

    return (req, res, next) => {

        Bot.findById(req.params.id)
            .then(ensureOne)
            .then(ensureLoggedUserIsOwner)
            .then(updateWeapons)
            .then(updateUser)
            .then(removeBot)
            .then(respond)
            .catch(error);

        function ensureOne(data) {
            return (data)? data : Promise.reject({code: 404})
        }

        function ensureLoggedUserIsOwner(bot) {
            if (bot.user != req.userId)
                return Promise.reject({code: 403});

            return bot;
        }

        function updateWeapons(bot) {
            let criteria = {
                bot: bot._id
            };

            let update = {
                $unset: {
                    bot: bot._id
                }
            };

            let options = {
                multi: true
            };

            return Weapon.update(criteria, update, options);
        }

        function updateUser() {
            return User.findByIdAndUpdate(req.userId, {
                $pull: {
                    bots: req.params.id
                }
            })
        }

        function removeBot() {
            return Bot.findByIdAndRemove(req.params.id)
        }

        function respond(data) {
            return res.status(204).send()
        }

        function error(reason) {
            if (!reason.code)
                return res.status(500).send(reason);

            return res.status(reason.code).send(reason.message);
        }
    }
};
