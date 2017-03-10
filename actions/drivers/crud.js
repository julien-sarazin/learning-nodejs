module.exports = (api) => {
    const Driver = api.models.Driver;

    function create(req, res, next) {
        Driver
            .create(req.body)
            .then(respond.bind(null, res))
            .catch(spread.bind(null, res));
    }

    function update(req, res, next) {
        Driver
            .update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            .then(respond.bind(null, res))
            .catch(spread.bind(null, res));
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