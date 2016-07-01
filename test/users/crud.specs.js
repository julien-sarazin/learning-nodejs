var request = require('supertest');
var expect = require('expect.js');
var CONSTANTS = require('../constants.json');
var fixtures = require('../fixtures');
var app = require('../../server.js');

describe('Users', function() {
    beforeEach(function loadingFixtures(done) {
        return fixtures
            .load()
            .then(done);
    });

    describe('create (/2 points)', function() {
        it('POST /users should create a new user', function(done) {
            return request(app)
                .post('/users')
                .send({email: 'email', password: 'password'})
                .expect(200, done);
        });

        it('POST /users without email or password should return a 400 BAD REQUEST', function(done) {
            return request(app)
                .post('/users')
                .set('content-type', 'application/json')
                .send({password: 'password'})
                .expect(400, done);
        });
    });

    describe('update (/2 points)', function() {
        it('PUT /users/:id with an invalid userId should return a 403 FORBIDDEN', function(done) {
            return request(app)
                .put('/users/' + CONSTANTS.USER.UNKOWN_ID)
                .set('Content-type', 'application/json')
                .set('Authorization', CONSTANTS.ACCESS_TOKEN)
                .send({password: 'password'})
                .expect(403, done);
        });

        it('PUT /users/:id should update the user', function(done) {
            return request(app)
                .put('/users/' + CONSTANTS.USER.KNOWN_ID)
                .set('Content-type', 'application/json')
                .set('Authorization', CONSTANTS.ACCESS_TOKEN)
                .send({email: 'update@gmail.net'})
                .expect(200, done);
        });
    });

    describe('list (/1 point)', function() {
        it('GET /users/ should list all the users', function(done) {
            return request(app)
                .get('/users')
                .send()
                .expect(200)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res.body.length).to.equal(2);
                    done();
                });
        });
    });

    describe('show (/2 points)', function() {
        it('GET /users/:id with an invalid ID should return 404 NOT FOUND', function(done) {
            return request(app)
                .get('/users/' + CONSTANTS.USER.UNKOWN_ID)
                .send()
                .expect(404, done);
        });

        it('GET /users/:id with a valid ID should return the correct user', function(done) {
            return request(app)
                .get('/users/' + CONSTANTS.USER.KNOWN_ID)
                .send()
                .expect(200)
                .end(function(err, res) {
                    expect(res.body._id).to.equal(CONSTANTS.USER.KNOWN_ID)
                    done();
                });
        });
    });
});
