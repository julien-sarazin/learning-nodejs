module.exports = (server) => {
    const Weapon = server.models.Weapon;

    return (req, res) => {
         new Weapon(req.body)
             .save((err, instance) => {
                if (err)
                    return res.status(500).send(err);
                res.status(201).send();
             });

    };
};