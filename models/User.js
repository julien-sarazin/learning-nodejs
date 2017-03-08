module.exports = (api) => {
  const User = api.mongoose.model('User', {
    username: {
      type: String,
      required: true
    },
    birthDate: {
      type: Date,
      default: new Date()
    }
  });

  return User;
}
