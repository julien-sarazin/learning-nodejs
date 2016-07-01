module.exports = function(server){
  return function(req, res, next){
    var User = server.models.User;
    var query = User
    .findById(req.params.id)
    .populate('offers');

    query.exec(function(err, instance){
      if (err)
        return res.status(500).send(err);

      res.send(instance.offers);
    });
  };
};
