const Promise = require('bluebird');

module.exports = (server) => {
    const Role = server.models.Role;
    const roles = server.settings.acl.roles;

    console.log('Starting creating roles script....');
    let promises = roles.map((role) => {
        return Role.findOne(role)
            .then(server.utils.ensureEmpty)
            .then(createRole)
            .catch(() => {
            });

        function createRole() {
            return new Role(role)
                .save()
        }
    });


    return Promise.all(promises)
        .then((roles)=> {
            console.log('done.');
            return roles;
        })
};