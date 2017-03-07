# NodeJS

### 1- Node Package Manager (NPM)
1.1 La commande npm

```bash   
npm init
npm install
npm install --save
npm test
```

1.2 Le package.json

```json
{
  "name": "@risingstack/node-hero",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC"
}
```

### 2- Modularisation

```javascript
const library_module = require("module");
const local_module = require("./module");
```


### 3- Un Serveur HTTP.

```javascript
var server = http.createServer( (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('It works!');
});

console.log("server listening on port 3000"); 
server.listen(3000);


server.on('request', (request, response) => {
    var body = [];
    request
        .on('data', (chunk) => {
            body.push(chunk);
        })
        .on('end', function() {
            body = Buffer.concat(body).toString();
        });
})

```

