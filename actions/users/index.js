const sha1 = require('sha1');

module.exports = (server) => {
    const User = server.models.User;
    const Role = server.models.Role;

    return {
        create,
        list,
        show,
        update,
        remove
    };

    function create(req, res, next) {
        let user = new User(req.body);

        return User.findOne({
            email: req.body.email
        })
            .then(server.utils.ensureEmpty)
            .catch(server.utils.reject(403, 'user.already.exists'))
            .then(createUser)
            .then(res.commit)
            .catch(res.error);

        function createUser() {
            user.password = sha1(user.password);
            Role.findOne({name: 'lambda'})
                .then(setRole);

            function setRole(role) {
                user.role = role._id.toString();
                return user.save()
            }
        }
    }


    function list(req, res, next) {
        User.find()
            .then(res.commit)
            .catch(res.error);
    }

    function show(req, res, next) {
        User.findById(req.params.id)
            .populate('tasks')
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'user.not.found'))
            .then(res.commit)
            .catch(res.error);
    }

    function update(req, res, next) {
        User.findByIdAndUpdate(req.body.id, req.body)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'user.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }

    function remove(req, res, next) {
        User.findByIdAndRemove(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'user.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }
};


