module.exports = (api) => {
    const Todo = api.models.Todo;
    const User = api.models.User;

    function create(req, res, next) {
        const userId = req.userId;

        let todo = new Todo(req.body);
        todo.creator = userId;
        todo.assigned = userId;

        todo.save((err, data) => {
            if (err) {
                return res.status(500).send(err);
            }

            User.findById(userId, (err, user) => {
                if (err) {
                    return res.status(500).send()
                }

                user.tasks.push(data._id.toString())
                user.save((err) => {
                    if (err) {
                        return res.status(500).send()
                    }

                    return res.send(data);
                });
            });
        });
    };

    function findOne(req, res, next) {
        Todo.findById(req.params.id, (err, data) => {
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
        Todo.find((err, data) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (!data || data.length == 0) {
                return res.status(204).send(data)
            }
            return res.send(data);
        });
    }

    function update(req, res, next) {
        Todo.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
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
        Todo.findByIdAndRemove(req.params.id, (err, data) => {
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
