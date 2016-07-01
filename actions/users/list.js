module.exports = function(server){
  return function(req, res, next){
    var User = server.models.User;
    var query = User.find();

    query.exec(function(err, instances){
      if (err)
        return res.status(500).send(err);
      res.send(instances);
    })
  }
}
