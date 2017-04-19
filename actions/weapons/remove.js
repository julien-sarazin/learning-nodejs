module.exports = (server) => {
    const Weapon = server.models.Weapon;

    return (req, res, next) => {
        Weapon.findByIdAndRemove(req.params.id, (err, instance) => {
            if (err)
                return res.status(500).send(err);

            if (!instance)
                return res.status(404).send();

            res.status(204).send();
        })
    }
};
