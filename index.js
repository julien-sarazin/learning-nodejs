const http = require('http');
const User = require('./User');
const port = 3000;
const db = [];

let server = http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });

  if (request.url != '/users') {
    response.writeHead(404);
    response.end();
  }
  if (request.method == 'POST')
  return createUser(request, response);

  if (request.method == 'GET')
  return response.end(JSON.stringify(db));

  if (request.method == 'PUT')
  return updateUser(request, response);

  if (request.method == 'DELETE')
  return removeUser(request, response);
});


function createUser(request, response) {
  let chunks = [];
  request.on('data', (chunk) => {
    chunks.push(chunk);
  });

  request.on('end', () => {
    let json = JSON.parse(chunks.toString());
    let user = new User(json);
    db.push(user);
    response.end(JSON.stringify(user));
  });
}


function updateUser(request, response) {
  let chunks = [];
  request.on('data', (chunk) => {
    chunks.push(chunk);
  });

  request.on('end', () => {
    let json = JSON.parse(chunks.toString());
    let found = false;

    db.forEach((user) => {
      if (user.id == json.id) {
        found = true;
        user.name = json.name;
        user.age = json.age;
      }
    });

    if (!found) {
      response.writeHead(404);
      return response.end();
    }

    response.writeHead(204)
    response.end();
  });
}

function removeUser(request, response) {
  let chunks = [];
  request.on('data', (chunk) => {
    chunks.push(chunk);
  });

  request.on('end', () => {
    let json = JSON.parse(chunks.toString());
    let index = -1;

    db.forEach((user, currentIndex) => {
      if (user.id == json.id) {
        index = currentIndex
      }
    });

    if (index != -1) {
      db.splice(index, 1);
    }
    else {
      response.writeHead(404);
      return response.end();
    }

    response.writeHead(204);
    response.end();
  });
}


console.log(`Server listening on port: ${port}`);
server.listen(port);
