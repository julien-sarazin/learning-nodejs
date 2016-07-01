var request = require('supertest');
var expect = require('expect.js');
var CONSTANTS = require('../constants.json');
var app = require('../../server.js');
var fixtures = require('../fixtures');

describe('Events', function() {
    beforeEach(function loadingFixtures(done) {
        return fixtures
            .load()
            .then(done);
    });

    describe('create (/2 points)', function() {
        it('POST /events without authentication should return a 401 UNAUTHORIZED', function(done) {
            return request(app)
                .post('/events')
                .set('Content-type', 'application/json')
                .send({title: 'event'})
                .expect(401, done);
        });

        it('POST /events should create a new event when the user is authenticated', function(done) {
            return request(app)
                .post('/events')
                .set('Content-type', 'application/json')
                .set('Authorization', CONSTANTS.ACCESS_TOKEN)
                .send({title: 'test event'})
                .expect(200)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res.body.title).to.equal('test event');
                    done();
                });
        });
    });

    describe('list (/1 point)', function() {
        it('GET /events/ should list all the events', function(done) {
            return request(app)
                .get('/events')
                .send()
                .expect(200)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res.body.length).to.equal(4);
                    done();
                });
        });
    });

    describe('show (/2 points)', function() {
        it('GET /events/:id should return the correct event', function(done) {
            return request(app)
                .get('/events/' + CONSTANTS.EVENTS.XY)
                .send()
                .expect(200, done);
        });

        it('GET /events/:id with an invalid ID should return 404 NOT FOUND', function(done) {
            return request(app)
                .get('/events/' + CONSTANTS.EVENTS.UNKNOWN)
                .send()
                .expect(404, done);
        });
    });
});
