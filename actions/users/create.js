module.exports = function(server){
  return function(req, res, next){
    var User = server.models.User;
    var user = new User(req.body);

    user.save(function(err, instance){
        if(err)
          return res.status(500).send(err);

        res.send(instance);
    });
  }
}
