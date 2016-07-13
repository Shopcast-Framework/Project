var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    Context     = require(process.env.NODE_PATH + '/test/context.js'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    __groups    = require(process.env.NODE_PATH + '/test/fixtures/group.json'),
    __users     = require(process.env.NODE_PATH + '/test/fixtures/user.json'),
    Helper      = Context.Helper;

describe('Api group controller', function () {

    before(function(done) {
        this.timeout(0);
        Context.auth(done);
    });

    beforeEach(function(done) {
        this.timeout(600);
        Context.clean(done);
    });

    it('[GET] /api/group', function(done) {
        Context.server
        .get('/api/group')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("group:get:success"),
            groups      : [__groups[0]]
        }, done);
    });

    it('[GET] /api/group/1', function(done) {
        var group = Helper.build.associate('Users', [__groups[0]], [[0, 1, 2, 3]], __users);

        Context.server
        .get('/api/group/1')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("group:getone:success", 1),
            group    : group[0]
        }, done);
    });

    it('[GET] /api/group/2', function(done) {
        Context.server
        .get('/api/group/2')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message : Message.get("group:getone:failure")
        }, done);
    });

    it('[GET] /api/group/999', function(done) {
        Context.server
        .get('/api/group/999')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message : Message.get("group:getone:failure")
        }, done);
    });

});
