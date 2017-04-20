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
});
