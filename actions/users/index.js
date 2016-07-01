module.exports = function(server){
 return {
    create: require('./create')(server),
    update: require('./update')(server),
    remove: require('./remove')(server),
    list: require('./list')(server),
    show: require('./show')(server),
    offers: require('./offers')(server)
  }
}
