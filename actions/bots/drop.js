module.exports = (server) => {
    const Bot = server.models.Bot;
    const Weapon = server.models.Weapon;

    return (req, res, next) => {

        Bot.findById(req.params.id, (err, bot) => {
            if (err)
                return res.status(500).send(err);

            if (!bot)
                return res.status(404).send();

            Weapon.findById(req.params.weaponId, (err, weapon) => {
                if (err)
                    return res.status(500).send(err);

                if (!weapon)
                    return res.status(404).send();


                let found = bot.weapons.some((weapon) => {
                    return weapon == req.params.weaponId
                });

                if (!found)
                    return res.status(403).send();

                bot.weapons.remove(req.params.weaponId);
                bot.slots++;

                weapon.bot = undefined;

                bot.save((err, data) => {
                    if (err)
                        return res.status(500).send(err);

                    weapon.save((err, data) => {
                        if (err)
                            return res.status(500).send(err);

                        res.status(204).send();
                    });
                });
            });
        });
    };
};