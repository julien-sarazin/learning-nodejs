module.exports = (api) => {
  api.use('/users', require('./users')(api));
  api.use('/cars', require('./cars')(api));
}
