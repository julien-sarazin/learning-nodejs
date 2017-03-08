module.exports = (api) => {
  const User = api.models.User;

  function create(req, res, next) {
    let user = new User(req.body);
    user.save((err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(data);
    });
  }

  function findOne(req, res, next) {
    User.findById(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data) {
        return res.status(204).send(data);
      }
      return res.send(data);
    });
  }

  function findAll(req, res, next) {
    User.find((err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!data || data.length == 0) {
        return res.status(204).send(data)
      }
      return res.send(data);
    });
  }

  function update(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send()
      }

      return res.send(data);
    });
  }

  function remove(req, res, next) {
    User.findByIdAndRemove(req.params.id, (err, data) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (!data) {
        return res.status(204).send();
      }

      return res.send(data);
    });
  }

  return  {
    create,
    findOne,
    findAll,
    update,
    remove
  };
}
