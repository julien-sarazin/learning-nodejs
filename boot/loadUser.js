const sha1 = require('sha1');

module.exports = (server) => {
    const Role = server.models.Role;
    const User = server.models.User;

    User.findOne()
        .then(server.utils.ensureEmpty)
        .then(createAdmin)
        .catch(() => {});

    function createAdmin(){
        const admin = {
            email: 'admin@admin.com',
            password: sha1('admin')
        };

        return new User(admin)
            .save()
            .then(setRole);


        function setRole(user){
            Role.findOne({name: 'admin'})
                .then(set);

            function set(role){
                user.role = role._id.toString();
                return user.save();
            }
        }
    }
};