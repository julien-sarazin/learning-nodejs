const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const port = 3000;
const db = [];
const User = require('./User');
const logger = require('./logger');

server.use(logger);

server.post('/users', bodyParser.json(), (req, res, next) => {
        var user = new User(req.body);
        db.push(user);
        return res.send(user);
    });

server.put('/users', bodyParser.json(), (req, res, next) => {
    for (let user of db) {
        if (user.id == req.body.id) {
            user.name = req.body.name;
            return res.send(user);
        }
    }

    return res.status(404).send('user.not.found');
});

server.delete('/users', bodyParser.json(), (req, res, next) => {
    let index = -1;
    db.forEach((user, currentIndex) => {
        if (user.id == req.body.id) {
            index = currentIndex;
        }
    });

    if (index != -1) {
        db.splice(index, 1);
        return res.status(204).send();
    }

    return res.status(404).send('user.not.found');
});

server.get('/users', (req, res, next) => {
    return res.send(db);
});

console.log(`server listening on port ${port}`);
server.listen(port);
