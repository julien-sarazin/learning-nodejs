module.exports = (api) => {
  api.actions = {
    users: require('./users'),
    todos: require('./todos')
  };
};
