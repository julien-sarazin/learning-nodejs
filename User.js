let AUTO_INCREMENT_ID = 0;

function User(json) {
  AUTO_INCREMENT_ID++;
  this.id = AUTO_INCREMENT_ID;
  this.name = json.name;
  this.age = json.age;
};

User.prototype = {
  id: Number,
  name: String,
  age: Number
};

User.prototype.sayHello = function(name) {
  return `Hello ${name}! My name is ${this.name}`;
}

module.exports = User;











/*

1. GET /users
=> retourne la liste des utilisateurs précedement
créés

2. PUT /users
=> permet de modifier un utilisateur avec pour information
son identifiant dans le body de la requête

3. DELETE /users
=> permet de supprimer un utilisateur avec pour information
son identifiant dans le body de la requête

*/
