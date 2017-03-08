module.exports = (api) => {
  const User = api.mongoose.model('User', {
    username: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date,
      required: true
    }
  });

  return User;
}
