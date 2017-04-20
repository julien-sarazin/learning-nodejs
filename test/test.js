const request = require('supertest');
const server = require('../index');

describe('GET /user', function () {
    it('respond with json', function (done) {
        request(server)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('should fail', function (done) {
        request(server)
            .get('/bots')
            .set('Accept', 'application/json')
            .expect(false)
            .expect(200, done);
    })
});
