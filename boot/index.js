const sha1 = require('sha1');

module.exports = (api) => {
    const Role = api.models.Role;
    const roles = api.settings.acl.roles;

    const User = api.models.User;
    const root = api.settings.acl.root;

    loadRoles()
        .then(loadUser);

    function loadRoles() {
        let batch = [];

        for (let role of roles) {
            let promise = Role.findOne({
                name: role.name
            })
                .then(ensureOne)
                .catch(create);

            batch.push(promise);

            function ensureOne(found) {
                return (found) ? found : Promise.reject(role);
            }

            function create() {
                console.log('Creating role: ', role);
                new Role(role)
                    .save()
                    .then(() => {
                        console.log('created.');
                    });
            }
        }

        return Promise.all(batch);
    }

    function loadUser() {
        User.find()
            .then(ensureOne)
            .catch(create);

        function ensureOne(users) {
            return (users && users.length > 0) ? true : Promise.reject();
        }

        function create() {
            Role.findOne({
                name: "root"
            })
                .then(createUser);

            function createUser(role) {
                let user = new User(root);
                user.password = sha1(user.password);
                user.role = role._id.toString();
                return user.save();
            }
        }
    }
};


