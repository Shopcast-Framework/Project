var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    Context     = require(process.env.NODE_PATH + '/test/context.js'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    __plannings = require(process.env.NODE_PATH + '/test/fixtures/planning.json'),
    Helper      = Context.Helper;

describe('Api planning controller', function () {

    before(function(done) {
        this.timeout(0);
        Context.auth(done);
    });

    beforeEach(function(done) {
        this.timeout(300);
        Context.clean(done);
    });

    it('[GET] /api/planning', function(done) {
        Context.server
        .get('/api/planning')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("planning:get:success"),
            plannings   : [__plannings[0]]
        }, done);
    });

    it('[GET] /api/planning/1', function(done) {
        Context.server
        .get('/api/planning/1')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("planning:getone:success", 1),
            planning    : __plannings[0]
        }, done);
    });

    it('[GET] /api/planning/2', function(done) {
        Context.server
        .get('/api/planning/2')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message : Message.get("planning:getone:failure")
        }, done);
    });

    it('[GET] /api/planning/999', function(done) {
        Context.server
        .get('/api/planning/999')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message : Message.get("planning:getone:failure")
        }, done);
    });

});
