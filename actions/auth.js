const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (api) => {
    const User = api.models.User;
    const Role = api.models.Role;

    function login(req, res, next) {
        const email = req.body.email;
        const password = sha1(req.body.password);

        User.findOne({
            email: email,
            password: password
        })
            .select('+role')
            .then(ensureOne)
            .then(generateToken)
            .then(res.prepare(200))
            .catch(res.prepare(404));

        function ensureOne(user){
            return (user)? user : Promise.reject();
        }

        function generateToken(user){
            return new Promise((resolve, reject) => {
                Role.findById(user.role)
                    .then(encryptToken);

                function encryptToken(role) {
                    let token = {
                        userId: user._id.toString(),
                        role: role.toJSON()
                    };

                    jwt.sign(token, api.settings.security.secret, {
                        expiresIn: '1d'
                    }, (err, encryptedToken) => {
                        if (err) {
                            return reject(err);
                        }

                        resolve(encryptedToken);
                    });
                }
            });
        }
    }

    return {
        login
    };
};