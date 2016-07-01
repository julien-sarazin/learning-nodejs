module.exports = function(server){
  return function(req, res, next){
    var User = server.models.User;
    var query = User.findByIdAndRemove(req.params.id);

    query.exec(function(err, removedInstance){
      if (err)
        return res.status(500).send(err);
      res.send(removedInstance);
    });
  }
}
