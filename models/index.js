module.exports = (api) => {
  console.log('initializing models...');
  api.db = {
    users: [],
    todos: []
  };

  api.models = {
    User: require('./User'),
    Todo: require('./Todo')
  };
};
