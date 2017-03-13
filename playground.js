const http = require('http');
const server = http.createServer();
const port = 3000;
const db = [];
const userRoute = '/users'
const User = require('./User');

console.log(`server listening on port ${port}`);
server.listen(port);


server.on('request', function(request, response){
	const method = request.method;
	const data = [];
	response.setHeader('Content-Type', 'application/json');

	if (request.url != userRoute) {
		response.statusCode = 404;
		response.end();
		return;
	}

	if (method == 'GET') {
		response.end(JSON.stringify(db));
		return;
	}

	request.on('data', function(chunk){
		data.push(chunk);
	});

	request.on('end', function(){
		let jsonString = data.toString();
		const json = JSON.parse(jsonString)

		if (method == 'POST') {
			let user = new User(json)
			db.push(user);
			response.end(jsonString);
			return;
		}

		if (method == 'PUT') {
			for (let user of db) {
					if (user.id == json.id) {
						user.name = json.name;
						response.end(JSON.stringify(user));
						return;
					}
			}

			response.statusCode = 404;
			response.end();
			return;
		}

		if (method == 'DELETE') {
			let index = -1;

			db.forEach((user, currentIndex)=> {
				if (user.id == json.id) {
					index = currentIndex;
				}
			});

			if (index != -1) {
				db.splice(index, 1);
				response.statusCode = 204;
				response.end();
				return;
			}

			response.statusCode = 404;
			response.end();
			return;
		}
	});
});
