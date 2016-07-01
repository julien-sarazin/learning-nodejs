var jwt = require('jsonwebtoken');

module.exports = function(server){
  var AuthToken = server.models.AuthToken;
  var User = server.models.User;

  return function(req, res, next){
    var signed = req.headers['authorization']
    if (!signed)
      return res.status(401).send('unauthorized');

    jwt.verify(signed, server.settings.TOKEN_SECRET, function(err, decoded){
      if (err)
        return res.status(401).send(err);

      var tokenId = decoded.auth;
      AuthToken.findById(tokenId, function(err, token){
        if (err)
          return res.status(500).send(err);
        if (!token)
          return res.status(401).send('unauthorized');

          User.findById(token.userId, function(err, user){
            if (err)
              return res.status(500).send(err);

            req.auth = req.auth || {};
            req.auth.user = user;
            req.auth.token = token._id;

            next();
          })
      })
    });
  }
}
