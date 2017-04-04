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
            .then(ensureOne)
            .then(res.prepare(200))
            .catch(res.prepare(404));

        function ensureOne(data) {
            return (data)? data : Promise.reject('user.not.found');
        }
    }

    function update(req, res, next) {
        User.findByIdAndUpdate(req.params.id, req.body)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function remove(req, res, next) {
        User.findByIdAndRemove(req.params.id)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    return {
        create,
        list,
        show,
        update,
        remove
    };
};
