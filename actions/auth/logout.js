module.exports = function(server){
  var AuthToken = server.models.AuthToken;

  return function(req, res, next){
    AuthToken.findByIdAndRemove(req.auth.token, function(err, data){
      if (err)
        return res.status(500).send(err);
      res.send('logout succeeded');
    });
  };
};
