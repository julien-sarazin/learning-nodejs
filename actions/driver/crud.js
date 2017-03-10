module.exports = (api) => {
    const Driver = api.models.Driver;

    function create(req, res, next) {
        Driver
            .sync({force: true})
            .then(createUser)
            .then(respond)
            .catch(spread);

        function createUser() {
            return Driver.create({
                name: 'John',
            });
        }

        function respond(user){
            res.send(user);
        }

        function spread(err){
            res.status(500).send(err);
        }
    }



    return {
        create,
        update,
        findOne,
        findAll,
        remove
    }
}