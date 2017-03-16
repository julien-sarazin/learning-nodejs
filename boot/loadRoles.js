module.exports = (server) => {
    const Role = server.models.Role;
    const roles = server.settings.acl.roles;

    roles.forEach((role) => {
        Role.findOne(role)
            .then(server.utils.ensureEmpty)
            .then(createRole)
            .catch(()=> {});

        function createRole() {
            return new Role(role)
                .save()
        }
    })
};