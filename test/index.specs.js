var chai = require('chai');
var chaiHttp = require('chai-http');

beforeEach(function useChaiHTTP() {
    chai.use(chaiHttp);
});
