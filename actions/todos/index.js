module.exports = (server) => {
    const Todo = server.models.Todo;
    const User = server.models.User;

    return {
        create,
        list,
        show,
        update,
        remove,
        assign: require('./assign')(server)
    };

    function create(req, res, next) {
        let user = null;

        return User.findById(req.user.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(403, 'invalid.user'))
            .then(createTodo)
            .then(setCreatorAndAssign)
            .then(persist)
            .then(res.commit)
            .catch(res.error);

        function createTodo(data) {
            user = data;
            return new Todo(req.body);
        }

        function setCreatorAndAssign(todo) {
            todo.creator = req.user.id;
            todo.assigned = req.user.id;
            return todo;
        }

        function persist(todo) {
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
        setTimeout(() => {
            Todo.find()
                .then(setCache)
                .then(res.commit)
                .catch(res.error);
        }, 3000);

        function setCache(todos) {
            server.cache.set({
                group: 'todos',
                key: req.originalUrl,
                value: todos
            });
            return todos;
        }
    }

    function show(req, res, next) {
        Todo.findById(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'todo.not.found'))
            .then(res.commit)
            .catch(res.error);
    }

    function update(req, res, next) {
        Todo.findByIdAndUpdate(req.body.id, req.body)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'todo.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }

    function remove(req, res, next) {
        Todo.findByIdAndRemove(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'todo.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }
};

