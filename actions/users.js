module.exports = (api) => {

  function create(req, res, next) {
    console.log('Creating a user: ', req.body);
    let user = new api.models.User(req.body);
    api.db.users.push(user);
    res.send(user);
  }

  function findOne(req, res, next) {

  }

  function findAll(req, res, next) {
    res.send([]);
  }

  function update(req, res, next) {

  }

  function remove(req, res, next) {

  }

  return  {
    create,
    findOne,
    findAll,
    update,
    remove
  };
}
