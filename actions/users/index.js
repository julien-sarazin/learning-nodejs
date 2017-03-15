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
      User.findById(req.params.id)
          .then(ensureOne)
          .then(respond.bind(null, res))
          .catch(spread.bind(null, res));
  }

  function update(req, res, next) {
      User.findByIdAndUpdate(req.body.id, req.body)
          .then(ensureOne)
          .then(empty)
          .then(respond.bind(null, res))
          .catch(spread.bind(null, res));
  }

  function remove(req, res, next) {
      User.findByIdAndRemove(req.params.id)
          .then(ensureOne)
          .then(empty)
          .then(respond.bind(null, res))
          .catch(spread.bind(null, res));
  }
};

function empty(data) {
    return (data) ? null : data
}

function ensureOne(data) {
    return (data) ? data : Promise.reject({code: 404, message: 'user.not.found'})
}

function respond(res, data) {
    if (!data) {
        return res.status(204).send()
    }

    return res.send(data);
}

function spread(res, error) {
    if (error.code) {
        return res.status(error.code).send(error.message);
    }

    return res.status(500).send(error);
}