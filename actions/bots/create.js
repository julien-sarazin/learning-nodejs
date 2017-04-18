module.exports = (server) => {
    const Bot = server.models.Bot;

    return (req, res) => {
         new Bot(req.body)
             .save((err, instance) => {
                if (err)
                    return res.status(500).send(err);
                res.status(201).send();
             });

    };
};