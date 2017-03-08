module.exports = (api) => {
  console.log('initializing actions...');
  api.actions = {
    users: require('./users')(api),
    todos: require('./todos')(api)
  };
};
