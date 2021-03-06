var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    Context = require(process.env.NODE_PATH + '/test/context.js'),
    Message = require(process.env.NODE_PATH + '/modules/messages'),
    __users = require(process.env.NODE_PATH + '/test/fixtures/user.json'),
    Helper  = Context.Helper;

describe('Api user controller', function () {

    before(function(done) {
        this.timeout(0);
        Context.auth(done);
    });

    beforeEach(function(done) {
        this.timeout(600);
        Context.clean(done);
    });

    it('[GET] /api/user', function(done) {
        Context.server
        .get('/api/user')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /api/user/1', function(done) {
        Context.server
        .get('/api/user/1')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message : Message.get("user:getone:success", 1),
            user    : __users[0]
        }, done);
    });

    it('[GET] /api/user/999 (Invalid id)', function(done) {
        Context.server
        .get('/api/user/999')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message : Message.get("user:getone:failure", 999)
        }, done);
    });

    it('[POST] /api/user', function(done) {
        var newUser = Helper.build.new('User', __users[__users.length - 1]);

        Context.server
        .post('/api/user')
        .set('Content-Type', 'application/json')
        .send(newUser)
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message : Message.get("user:post:success"),
            user : newUser
        }, done);
    });

    it('[PUT] /api/user/1', function(done) {
        var editUser = Helper.build.edit('User', __users[0]);

        Context.server
        .put('/api/user/1')
        .send(editUser)
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("user:put:success"),
            user        : editUser
        }, done);
    });

    it('[PUT] /api/user/999 (Invalid id)', function(done) {
        var editUser = Helper.build.edit('User', __users[0]);

        Context.server
        .put('/api/user/999')
        .send(editUser)
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message : Message.get("user:put:failure")
        }, done);
    });

    it('[DELETE] /api/user/1', function(done) {
        Context.server
        .del('/api/user/1')
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message : Message.get("user:delete:success")
        }, done);
    });

});
