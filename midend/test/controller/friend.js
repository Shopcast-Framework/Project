var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    Context     = require(process.env.NODE_PATH + '/test/context.js'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    __users     = require(process.env.NODE_PATH + '/test/fixtures/user.json'),
    __friends   = require(process.env.NODE_PATH + '/test/fixtures/friend.json'),
    Helper      = Context.Helper;

describe('Api friend controller', function () {

    before(function(done) {
        this.timeout(0);
        Context.auth(done);
    });

    beforeEach(function(done) {
        this.timeout(600);
        Context.clean(done);
    });

    it('[GET] /api/user/1/friend', function(done) {
        var friends = Helper.build.associate(
            'Friend',
            [__users[1], __users[3]], [[0], [2]],
            __friends
        );

        Context.server
        .get('/api/user/1/friend')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message: Message.get("friend:get:success"),
            friends: friends
        }, done);
    });

    it('[GET] /api/user/999/friend (Invalid user)', function(done) {
        Context.server
        .get('/api/user/999/friend')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message: Message.get("friend:get:failure")
        }, done);
    });

    it('[POST] /api/user/1/friend', function(done) {
        Context.server
        .post('/api/user/1/friend')
        .set(Context.header())
        .send({ friend_id: 3 })
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message: Message.get("friend:post:success")
        }, done);
    });

    it('[POST] /api/user/999/friend (Invalid id)', function(done) {
        Context.server
        .post('/api/user/999/friend')
        .set(Context.header())
        .send({ friend_id: 3 })
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message: Message.get("friend:post:failure")
        }, done);
    });

    it('[POST] /api/user/1/friend (Invalid friend id)', function(done) {
        Context.server
        .post('/api/user/1/friend')
        .set(Context.header())
        .send({ friend_id: 999 })
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message: Message.get("friend:post:failure")
        }, done);
    });

    it('[PUT] /api/user/1/friend/4', function(done) {
        Context.server
        .put('/api/user/1/friend/4')
        .set(Context.header())
        .send({ accepted: true })
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message: Message.get("friend:put:success")
        }, done);
    });

    it('[PUT] /api/user/999/friend/4 (Invalid user id)', function(done) {
        Context.server
        .put('/api/user/999/friend/4')
        .set(Context.header())
        .send({ accepted: true })
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message: Message.get("friend:put:failure")
        }, done);
    });

    it('[PUT] /api/user/1/friend/999 (Invalid id)', function(done) {
        Context.server
        .put('/api/user/1/friend/999')
        .set(Context.header())
        .send({ accepted: true })
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message: Message.get("friend:put:failure")
        }, done);
    });

});
