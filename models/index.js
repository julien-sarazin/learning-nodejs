module.exports = (api) => {
  api.db = {
    users: [],
    cars: []
  };
  
  api.models = {
    User: require('./User'),
    Car: require('./Car')
  };
};
