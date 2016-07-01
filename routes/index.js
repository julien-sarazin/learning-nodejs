module.exports = function(server){
  server.use('/jobs', require('./jobs')(server));
  server.use('/users', require('./users')(server));
  server.use('/auth', require('./auth')(server));
}
