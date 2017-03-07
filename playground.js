const http = require('http');
const server = http.createServer();

console.log("server listening on port 3000");
server.listen(3000);

// Step #1.
server.on('request', (req, res) => {
 res.writeHead(200, {
   'Content-Type': 'text/plain'
 });
 res.end('It works!');
});

// Step #2.
/*
server.on('request', (request, response) => {
    var body = [];
    request
        .on('data', (chunk) => {
            body.push(chunk);
        })
        .on('end', function() {
            body = Buffer.concat(body).toString();
            console.log("body: ", body);
        });
});
*/

// Step #3.
// Identifier la route et le verbe utilisé
server.on('request', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
    });
    res.writeBody('<h1> Hello World </h1>');
    res.end('It Works!')
  }
});

// Step #4. Exercice.
// Construire un webserbice REST qui permet de CREATE/LIST des Users (name: String, age: Int)
