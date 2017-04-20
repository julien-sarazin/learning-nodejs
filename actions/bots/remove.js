module.exports = (server) => {
    const Bot = server.models.Bot;
    const Weapon = server.models.Weapon;
    const User = server.models.User;

    return (req, res, next) => {

        Bot.findById(req.params.id)
            .then(ensureLoggedUserIsOwner)
            .then(updateWeapons)
            .then(updateUser)
            .then(removeBot)
            .then(respond)
            .catch(error);


        function ensureLoggedUserIsOwner(bot) {
            if (bot.user != req.userId)
                return Promise.reject(403);

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
            if (data)
                return res.send(data);

            return res.status(204).send()
        }

        function error(code) {
            if (!code)
                return res.status(500).send();

            return res.status(code).send();
        }
    }
};
