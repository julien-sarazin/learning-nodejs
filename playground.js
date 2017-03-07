const http = require('http');
const server = http.createServer();
const path = '/users';
const users = [];

server.on('request', (request, response) => {
  var body = [];
  response.setHeader('Content-Type', 'application/json');

  if (request.url != path || (request.method != 'POST' && request.method != 'GET')) {
    response.statusCode = 404;
    return response.end();
  }

  if (request.method == 'GET') {
    return response.end(JSON.stringify(users));
  }

  request.on('data', (chunk) => {
    body.push(chunk);
  })

  request.on('end', () => {
    let data = Buffer.concat(body).toString();
    let json = JSON.parse(data);

    users.push(json);
    response.end(data);
  });
});

console.log("server listening on port 3000");
server.listen(3000);
