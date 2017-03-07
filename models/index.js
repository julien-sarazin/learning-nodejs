module.exports = (api) => {
  api.models = {
    User: require('./User'),
    Todo: require('./Todo')
  }
};
