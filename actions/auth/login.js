var jwt = require('jsonwebtoken');

module.exports = function(server){
  var AuthToken = server.models.AuthToken;
  var User = server.models.User;

  return function(req, res, next){
    var query = User.findOne(req.body);
    query.exec(function(err, user){
      if (err)
        return res.status(500).send(err);

      if (!user)
        return res.status(404).send('invalid credentials');

        new AuthToken({userId: user._id}).save(function(err, token){
          if (err)
            return res.status(500).send(err);

          var encrypted = jwt.sign({auth: token._id}, server.settings.TOKEN_SECRET);
          res.send(encrypted);
        });
    });
  }
}
