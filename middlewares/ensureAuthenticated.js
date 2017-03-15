module.exports = (server) => {
    const Token = server.models.Token;
    const User = server.models.User;

    return (req, res, next) => {
        let authorization = req.headers['authorization'];

        if (!authorization)
            return res.status(401).send('unauthorized');

        Token.findById(authorization)
            .then(ensureOne)
            .then(findAssociatedUser)
            .then(ensureOne)
            .then(setUserId)
            .then(next)
            .catch(unauthorized);

        function findAssociatedUser(token) {
            return User.findById(token.userId)
        }

        function setUserId(user) {
            req.userId = user._id
        }

        function unauthorized(){
            return res.status(401).send('unauthorized');
        }
    };
};

function ensureOne(data) {
    return (data) ? data : Promise.reject()
}
