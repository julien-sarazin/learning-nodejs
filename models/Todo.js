function Todo(json) {
  this.title = json.title;
  this.userId = json.userId;
};

Todo.prototype = {
  title: String,
  userId: String
};

module.exports = Todo;
