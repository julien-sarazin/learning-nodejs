module.exports = (api) => {
  const User = api.models.User;

  function create(req, res, next) {
    let user = new User({
      name: "foobar"
    });

    api.db.users.push(user);
    res.status(201).send();
  }

  function list(req, res, next) {
    res.send(api.db.users);
  }

  function show(req, res, next) {

  }

  function update(req, res, next) {

  }

  function remove(req, res, next) {

  }

  return {
    create,
    list,
    show,
    update,
    remove
  };
};
