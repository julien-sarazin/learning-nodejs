const sha1 = require('sha1');

module.exports = (api) => {
    const User = api.models.User;
    const Role = api.models.Role;

    function create(req, res, next) {
        let user = new User(req.body);
        user.password = sha1(user.password);

        User.findOne({
            email: user.email,
        }, (err, found) => {
            if (err) {
                return res.status(500).send(err)
            }

            if (found) {
                return res.status(401).send('email.already.exists')
            }

            User.count((err, count) => {
                if (err) {
                    return res.status(500).send();
                }

                if (count == 0) {
                    return Role.findOne({title: 'Admin'}, (err, role) => {
                        user.role = role._id.toString();
                        saveUser();
                    })
                }

                return Role.findOne({title: 'Peon'}, (err, role) => {
                    user.role = role._id.toString();
                    saveUser();
                });
            })
        });

        function saveUser() {
            user.save((err, data) => {
                if (err) {
                    return res.status(500).send(err);
                }

                return res.send(data);
            })
        }
    }

    function findOne(req, res, next) {
        User.findById(req.params.id, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (!data) {
                return res.status(204).send(data);
            }
            return res.send(data);
        });
    }

    function findAll(req, res, next) {
        setTimeout(getUsers, 3000);
        function getUsers() {
            User.find((err, data) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (!data || data.length == 0) {
                    return res.status(204).send(data)
                }

                api.middlewares.cache.set(data, req.url);
                return res.send(data);
            });
        }
    }

    function update(req, res, next) {
        User.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!data) {
                return res.status(204).send()
            }

            return res.send(data);
        });
    }

    function remove(req, res, next) {
        User.findByIdAndRemove(req.params.id, (err, data) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (!data) {
                return res.status(204).send();
            }

            return res.send(data);
        });
    }

    return {
        create,
        findOne,
        findAll,
        update,
        remove
    };
}
