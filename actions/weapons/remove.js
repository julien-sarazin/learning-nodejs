module.exports = (server) => {
    const Weapon = server.models.Weapon;
    const Bot = server.models.Bot;

    return (req, res, next) => {
        Weapon.findByIdAndRemove(req.params.id, (err, weapon) => {
            if (err)
                return res.status(500).send(err);

            if (!weapon)
                return res.status(404).send();

            if (!weapon.bot)
                return res.status(204).send();

            Bot.findById(weapon.bot, (err, bot) => {
                bot.weapons.remove(weapon._id);
                bot.slots ++;
                bot.save((err, data) => {
                    if (err)
                        return res.status(500).send(err);

                    res.status(204).send();
                });
            })
        })
    }
};
