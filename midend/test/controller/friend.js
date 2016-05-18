var Context     = require(process.env.NODE_PATH + '/test/context.js'),
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
        this.timeout(300);
        Context.clean(done);
    });

    // [get] : /user/:user_id/friend
    // [post] : /user/:user_id/friend
    // [put] : /user/:user_id/friend/:id

    it('[GET] /api/user/1/friend', function(done) {
        var friend = __users[1],
            friends = Helper.build.associate('Friend', [friend], [[0]], __friends);

        Context.server
        .get('/api/user/1/friend')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message: Message.get("friend:get:success"),
            friends: friends
        }, done);
    });

    // it('[POST] /api/user/1/friend', function(done) {
    //     var newUser = Helper.build.new('User', __users[0]);
    //
    //     Context.server
    //     .post('/api/user')
    //     .set('Content-Type', 'application/json')
    //     .send(newUser)
    //     .expect(Helper.date.truncate)
    //     .expect(200, {
    //         message : Message.get("user:post:success"),
    //         user : newUser
    //     }, done);
    // });
    //
    // it('[PUT] /api/user/1/friend/2', function(done) {
    //     var editUser = Helper.build.edit('User', __users[0]);
    //
    //     Context.server
    //     .put('/api/user/1')
    //     .send(editUser)
    //     .expect(Helper.date.truncate)
    //     .expect(200, {
    //         message     : Message.get("user:put:success"),
    //         user        : editUser
    //     }, done);
    // });

});
