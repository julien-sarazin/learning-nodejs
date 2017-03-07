const express = require('express');
const bodyParser = require("body-parser");
const uuid = require('uuid/v4');

const api = express();
const port = 3000;
const db = {
  users: [],
  todos: []
};

/**
User Model
*/
function User(json) {
  this._id = uuid();
  this.name = json.name;
  this.birthDate = json.birthDate || new Date();
}

User.prototype = {
  _id: String,
  name: String,
  birthDate: Date
};

/**
User's CRUD endpoints
*/

// find()
// => 200 => [User]
// => 5xx => ERROR
api.get('/users', (req, res, next) => {
  res.send(db.users);
});

// findOne()
// => 200 => User
// => 404 => No user matching ID.
api.get('/users/:id', (req, res, next) => {
  const userId = req.params.id;
  for(let i=0; i<db.users.length; i++) {
    if (db.users[i]._id == userId) {
      return res.send(db.users[i]);
    }
  }
  return res.status(404).send();
});

// remove()
// => 204 => Successful
// => 404 => No user matching ID.
api.delete('/users/:id', (req, res, next) => {
  const userId = req.params.id;
  for(let i=0; i<db.users.length; i++) {
    if (db.users[i]._id == userId) {
      db.users.splice(i, 1);
      return res.status(204).send();
    }
  }
  return res.status(404).send();
});

api.put('/users/:id', bodyParser.json(), ensureUserName,
(req, res, next) => {
  const userId = req.params.id;
  for(let i=0; i<db.users.length; i++) {
    if (db.users[i]._id == userId) {
      db.users[i].name = req.user.name;
      return res.send(db.users[i]);
    }
  }
  return res.status(4040).send();
});

api.post('/users', bodyParser.json(), ensureUserName,
(req, res, next) => {
  db.users.push(req.user);
  res.send(req.user);
});


/**
MIDDLEWARE
generic functions validating inputs.
*/
function ensureUserName(req, res, next) {
    if (!req.body.user || !req.body.user.name ) {
      return res.status(400).send()
    }

    req.user = new User(req.body.user);
    next();
}

console.log(`Server listening on port ${port}`);
api.listen(port);
