module.exports = function(server){
  return function(req, res, next){
    var Job = server.models.Job;
    var query = Job.findByIdAndRemove(req.params.id);

    query.exec(function(err, removedInstance){
      if (err)
        return res.status(500).send(err);
      res.send(removedInstance);
    });
  };
};
