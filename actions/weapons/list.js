module.exports = (server) => {
    const Weapon = server.models.Weapon;

    return (req, res, next) => {
        Weapon.find((err, instances) => {
            if (err)
                return res.status(500).send(err);

            res.send(instances);
        });
    }
};
