const pg = require('pg');

module.exports = (api) => {
    const Role = api.models.Role

    api.settings.security.roles.forEach((role) => {
        Role
            .findOne({title: role})
            .then(ensureOne)
            .catch(create.bind(null, {title: role}));

        function ensureOne(data){
            return data? data : Promise.reject()
        }

        function create(data){
            let role = new Role(data);
            role.save()
                .then(console.log)
                .catch(console.err);
        }
    });

    // connect to postgres db
    pg.connect(api.settings.db.sql.host, function(err, client, done) {
        console.error(err);
        // create the db and ignore any errors, for example if it already exists.
        client.query('CREATE DATABASE ' + api.settings.db.sql.name, function(err) {
            //db should exist now, initialize Sequelize
            client.end(); // close the connection
        });
    });


}


