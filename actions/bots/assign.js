module.exports = (server) => {
    const Bot = server.models.Bot;
    const Weapon = server.models.Weapon;

    //bots/:id/assign/:weaponId
    return (req, res, next) => {
        // 1. Vérifier si l'arme existe
        // 2. Vérifier si l'arme n'est pas déjà assignée
        // 3. Vérifier si le bot existe
        // 4. Vérifier s' il dispose d'une place disponible


        Weapon.findById(req.params.weaponId, (err, weapon) => {
            if (err)
                return res.status(500).send();

            if (!weapon)
                return res.status(404).send();

            if (weapon.bot)
                return res.status(403).send();

            Bot.findById(req.params.id, (err, bot) => {
                if (err)
                    return res.status(500).send();

                if (!bot)
                    return res.status(404).send();

                if (bot.slots == 0)
                    return res.status(403).send();

                weapon.bot = bot._id;

                bot.weapons.push(weapon._id);
                bot.slots --;

                weapon.save((err, instance) => {
                    if (err)
                        return res.status(500).send();

                    bot.save((err, instance) => {
                        if (err)
                            return res.status(500).send();

                        res.status(204).send();
                    })
                })
            })
        })
    };
};