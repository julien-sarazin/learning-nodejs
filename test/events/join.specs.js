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

    describe('join (/4 points)', function() {
        it('POST /events/:id/join for not unauthenticated user should return a 401 UNAUTHORIZED', function(done) {
            return request(app)
                .post('/events/:id/join '.replace(':id', CONSTANTS.EVENTS.XY))
                .send()
                .expect(401, done);
        });

        it('POST /events/:id/join for users that already participate should return a 403 FORBIDDEN', function(done) {
            return request(app)
                .post('/events/:id/join '.replace(':id', CONSTANTS.EVENTS.XY))
                .set('Content-type', 'application/json')
                .set('Authorization', CONSTANTS.ACCESS_TOKEN)
                .send()
                .expect(403, done);
        });

        it('POST /events/:id/join for the creator should return a 403 FORBIDDEN', function(done) {
            return request(app)
                .post('/events/:id/join '.replace(':id', CONSTANTS.EVENTS.XY))
                .set('Content-type', 'application/json')
                .set('Authorization', CONSTANTS.ACCESS_TOKEN)
                .send()
                .expect(403, done);
        });

        it('POST /events/:id/join should add a participant to the event', function(done) {
            return request(app)
                .post('/events/:id/join '.replace(':id', CONSTANTS.EVENTS.FOOBAR))
                .set('Content-Type', 'application/json')
                .set('Authorization', CONSTANTS.ACCESS_TOKEN)
                .send()
                .expect(200)
                .end(function(err, res){
                    expect(res.body.participants.length).to.equal(2);
                    done();
                });
        });
    });

    describe('leave (/4 points) ', function() {
        it('POST /events/:id/leave for not unauthenticated user should return a 401 UNAUTHORIZED', function(done) {
            return request(app)
                .post('/events/:id/leave '.replace(':id', CONSTANTS.EVENTS.FOOBAR))
                .send()
                .expect(401, done);
        });

        it('POST /events/:id/leave for a user that does not participate should return a 404 NOT FOUND', function(done) {
            return request(app)
                .post('/events/:id/leave '.replace(':id', CONSTANTS.EVENTS.FOOBAR))
                .set('Authorization', CONSTANTS.ACCESS_TOKEN)
                .send()
                .expect(404, done);
        });

        it('POST /events/:id/leave for the creator should return a 403 forbidden', function(done){
            return request(app)
                .post('/events/:id/leave '.replace(':id', CONSTANTS.EVENTS.XY))
                .set('Authorization', CONSTANTS.ACCESS_TOKEN)
                .send()
                .expect(403, done);
        });


        it('POST /events/:id/leave should remove a participant to the event', function(done) {
            return request(app)
                .post('/events/:id/leave '.replace(':id', CONSTANTS.EVENTS.PARTICIPATED))
                .set('Authorization', CONSTANTS.ACCESS_TOKEN)
                .send()
                .expect(200)
                .end(function(err, res){
                    expect(res.body.participants.length).to.equal(1);
                    done();
                });
        });
    });
});
