let AUTO_INCREMENT_ID = 0;

function User(dict) {
  AUTO_INCREMENT_ID ++;
  this.id = AUTO_INCREMENT_ID;
  this.name = dict.name;
}

User.prototype = {
  id: Number,
  name: String
};

module.exports = User;
