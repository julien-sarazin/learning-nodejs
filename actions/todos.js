module.exports = (api) => {
  const Todo = api.models.Todo;

  function create(req, res, next) {
    let todo = new Todo(req.body);
    todo.save((err, data) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send(data);
    });
  }

  function findOne(req, res, next) {
    Todo.findById(req.params.id, (err, data) => {
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
    Todo.find((err, data) => {
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
    Todo.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
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
    Todo.findByIdAndRemove(req.params.id, (err, data) => {
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
