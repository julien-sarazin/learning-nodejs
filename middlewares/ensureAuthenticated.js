const jwt = require('jsonwebtoken');

module.exports = (server) => {
    const Role = server.models.Role;
    const User = server.models.User;

    return (req, res, next) => {
        let authorization = req.headers['authorization'];

        if (!authorization)
            return unauthorized();


        return verifyToken()
            .then(findAssociatedUser)
            .then(server.utils.ensureOne)
            .then(setAuthorization)
            .then(next)
            .catch(unauthorized);

        function verifyToken() {
            return new Promise((resolve, reject) => {
                jwt.verify(authorization,
                    server.settings.security.salt,
                    (err, decryptedToken) => {
                        if (err){
                            return reject(err)
                        }

                        return resolve(decryptedToken)
                });
            })
        }

        function findAssociatedUser(decryptedToken) {
            return User.findById(decryptedToken.data.userId, '+role')
        }

        function setAuthorization(user) {
            req.user = {
                id: user._id.toString()
            };

            return Role.findById(user.role)
                .then(setAccessLevel);

            function setAccessLevel(role){
                req.user.accessLevel = role.level;
            }

        }

        function unauthorized(){
            return res.status(401).send('unauthorized');
        }
    };
};

function ensureOne(data) {
    return (data) ? data : Promise.reject()
}
