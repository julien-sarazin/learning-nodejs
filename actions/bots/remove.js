module.exports = (server) => {
    const Bot = server.models.Bot;
    const Weapon = server.models.Weapon;

    return (req, res, next) => {
        Bot.findByIdAndRemove(req.params.id, (err, bot) => {
            if (err)
                return res.status(500).send(err);

            if (!bot)
                return res.status(404).send();

            let criteria = {
                _id: {
                    $in: bot.weapons
                }
            };

            let update = {
                $unset: {
                    'bot': bot._id
                }
            };

            let options = {
                multi: true
            };

            Weapon.update(criteria, update, options, (err, result) => {
                if (err)
                    return res.status(500).send(err);

                res.status(204).send();
            });
        })
    }
};
