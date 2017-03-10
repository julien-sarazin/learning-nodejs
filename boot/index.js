module.exports = (api) => {
    const Role = api.models.Role

    api.settings.security.roles.forEach((role) => {
        Role
            .findOne({title: role})
            .then(ensureOne)
            .catch(create.bind(null, {title: role}));

    });

    function ensureOne(data){
        return data? data : Promise.reject()
    }

    function create(data){
        let role = new Role(data);
        role.save()
            .then(console.log)
            .catch(console.err);
    }
}


