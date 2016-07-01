module.exports = function(server){
  return function(req, res, next){
    var User = server.models.User;
    var query = User.findByIdAndUpdate(req.params.id, req.body);

    query.exec(function(err, oldInstance){
      if (err)
        return res.status(500).send(err);
      res.send(oldInstance);
    })
  }
}
