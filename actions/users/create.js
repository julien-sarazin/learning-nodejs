const sha1 = require('sha1');

module.exports = (server) => {
    const User = server.models.User;

    return (req, res) => {

            findUser()
            .then(ensureNone)
            .then(encryptPassword)
            .then(createUser)
            .then(res.created)
            .catch(res.error);

            function findUser() {
                return User.findOne({
                    email: req.body.email
                });
            }

            function ensureNone(user) {
                return (user)? Promise.reject({code: 403, reason: 'email.already.exists'}) : user;
            }

            function encryptPassword() {
                req.body.password = sha1(req.body.password)
            }

            function createUser() {
                return new User(req.body)
                    .save();
            }
    };
};