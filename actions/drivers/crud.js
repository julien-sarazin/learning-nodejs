module.exports = (api) => {
    const Driver = api.models.Driver;

    function create(req, res, next) {
        Driver
            .sync({force: true})
            .then(createUser)
            .then(respond.bind(null, res))
            .catch(spread.bind(null, res));

        function createUser() {
            return Driver.create(req.body);
        }
    }

    function update(res, res, next) {

    }

    function findOne(req, res, next) {

    }

    function findAll(req, res, next) {

    }

    function remove(req, res, next) {

    }

    return {
        create,
        update,
        findOne,
        findAll,
        remove
    }
}

function respond(res, user){
    res.send(user);
}

function spread(res, err){
    res.status(500).send(err);
}