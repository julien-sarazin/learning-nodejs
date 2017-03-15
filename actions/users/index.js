module.exports = (server) => {
    const User = server.models.User;

    return {
      create,
      list,
      show,
      update,
      remove
  };


  function create(req, res, next) {
      let user = new User(req.body);
      return user.save()
          .then(respond.bind(null, res))
          .catch(spread.bind(null, res));
  }

  function list(req, res, next) {
      User.find()
          .then(respond.bind(null, res))
          .catch(spread.bind(null, res));
  }

  function show(req, res, next) {

  }

  function update(req, res, next) {

  }

  function remove(req, res, next) {

  }
};


function respond(res, data) {
    return res.send(data);
}

function spread(res, error) {
    if (error.code) {
        return res.status(error.code).send(error.message);
    }

    return res.status(500).send(error);
}