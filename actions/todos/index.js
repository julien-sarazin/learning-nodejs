module.exports = (server) => {
    const Todo = server.models.Todo;
    const User = server.models.User;

    return {
      create,
      list,
      show,
      update,
      remove
  };


  function create(req, res, next) {
      let user = null;

      return User.findById(req.body.userId)
          .then(ensureOne)
          .then(createTodo)
          .then(setCreatorAndAssign)
          .then(persist)
          .then(respond.bind(null, res))
          .catch(spread.bind(null, res));


      function createTodo(data) {
          user = data;
          return new Todo(req.body);
      }

      function setCreatorAndAssign(todo) {
          todo.creator = req.body.userId;
          todo.assigned = req.body.userId;
          return todo;
      }

      function persist(todo){
          return todo.save()
              .then(addToUser)
              .then(returnTodo);

          function addToUser(todo) {
              user.tasks.push(todo._id);
              user.save()
          }

          function returnTodo() {
              return todo;
          }
      }
  }

  function list(req, res, next) {
      Todo.find()
          .then(respond.bind(null, res))
          .catch(spread.bind(null, res));
  }

  function show(req, res, next) {
      Todo.findById(req.params.id)
          .then(ensureOne)
          .then(respond.bind(null, res))
          .catch(spread.bind(null, res));
  }

  function update(req, res, next) {
      Todo.findByIdAndUpdate(req.body.id, req.body)
          .then(ensureOne)
          .then(empty)
          .then(respond.bind(null, res))
          .catch(spread.bind(null, res));
  }

  function remove(req, res, next) {
      Todo.findByIdAndRemove(req.params.id)
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
    return (data) ? data : Promise.reject({code: 404, message: 'Todo.not.found'})
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