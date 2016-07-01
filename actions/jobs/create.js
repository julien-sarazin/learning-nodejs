module.exports = function(server){
  var User = server.models.User;
  var Job = server.models.Job;

  return function(req, res, next){
    var body = req.body;
    body.owner = req.auth && req.auth.user._id;

    var query = User.findById(body.owner);
    query.exec(function(err, user){
      if (err)
        return res.status(500).send(err);
        
        new Job(body).save(function(err, job){
          if (err)
            return res.status(500).send(err);

          user.offers.push(job._id);
          user.save(function(err, instance){
            if (err)
              return res.status(500).send(err);

            res.send(job);
          });
        });
    });
  }
}
