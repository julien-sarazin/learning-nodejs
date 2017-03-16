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
            .then(ensureOne)
            .then(createToken)
            .then(getTokenId)
            .then(respond.bind(null, res))
            .catch(spread.bind(null, res));

        function createToken(user){
            return new Token({userId: user._id})
                .save();
        }

        function getTokenId(token) {
            return token._id;
        }
    }
};

function ensureOne(data) {
    return (data) ? data : Promise.reject({code: 404, message: 'Todo.not.found'})
}

function respond(res, data) {
    if (!data) {
        return res.status(204).send()
    }

    return res.send(data);
}

function spread(res, error) {
    if (error.code) {
        return res.status(error.code).send(error.message);
    }

    return res.status(500).send(error);
}