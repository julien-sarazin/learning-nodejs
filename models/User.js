const uuid = require('uuid/v4');

function User(json) {
  this._id = uuid();
  this.username = json.username;
  this.email = json.email;
  this.todos = [];
};

User.prototype = {
  _id: String,
  username: String,
  email: String,
  todos: Array
};

module.exports = User;
