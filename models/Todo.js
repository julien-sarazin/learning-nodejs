module.exports = (api) => {
  const Todo = api.mongoose.model('Todo', {
    title: {
      type: String,
      required: true
    },
    dueDate: Date,
  });

  return Todo;
}
