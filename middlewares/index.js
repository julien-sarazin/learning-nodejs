module.exports = (api) => {
  api.middlewares = {
    ensureUserName: require('./ensureUserName')
  }
};
