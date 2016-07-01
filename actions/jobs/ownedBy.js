module.exports = function(server){
  return function(req, res, next){
    var Job = server.models.Job;
    var query = Job.find({owner: req.params.owner});

    query.exec(function(err, instances){
      if (err)
        return res.status(500).send(err);

      res.send(instances)
    })
  }
}
