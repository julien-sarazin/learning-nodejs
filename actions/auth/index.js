const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (server) => {
    const Token = server.models.Token;
    const User = server.models.User;

    return {
        login
    };

    function login(req, res, next) {
        User.findOne({
            email: req.body.email,
            password: sha1(req.body.password)
        })
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(401, 'invalid.credentials'))
            .then(createToken)
            .then(getTokenId)
            .then(res.commit)
            .catch(res.commit);

        function createToken(user){
            return new Token({userId: user._id})
                .save();
        }

        function getTokenId(token) {
            return token._id;
        }
    }
};