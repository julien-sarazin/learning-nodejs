module.exports = (api) => {
    const User = api.models.User;

    function create(req, res, next) {
        let user = new User(req.body);

        return ensureEmailDoesNotExist()
            .then(save)
            .then(respond)
            .catch(spread);

        function ensureEmailDoesNotExist() {
            return User.findOne({
                email: req.body.email
            })
                .then(ensureNone);

            function ensureNone(data) {
                return (data)? Promise.reject() : data;
            }
        }

        function save() {
            return user.save();
        }

        function respond(){
            res.status(201).send();
        }

        function spread(){
            res.status(500).send();
        }
    }

    function list(req, res, next) {
        User.find()
            .then(respond)
            .catch(spread);

        function respond(data) {
            res.send(data);
        }

        function spread(reason) {
            res.status(500).send();
        }
    }

    function show(req, res, next) {
        User.findById(req.params.id)
            .then(respond);

        function respond(data) {
            if (!data) {
                return res.status(404).send()
            }

            res.send(data);
        }
    }

    function update(req, res, next) {

    }

    function remove(req, res, next) {

    }

    return {
        create,
        list,
        show,
        update,
        remove
    };
};
