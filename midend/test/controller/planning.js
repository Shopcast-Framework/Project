var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    Context     = require(process.env.NODE_PATH + '/test/context.js'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    __plannings = require(process.env.NODE_PATH + '/test/fixtures/planning.json'),
    __playlists = require(process.env.NODE_PATH + '/test/fixtures/playlist.json'),
    Helper      = Context.Helper;

//TODO test monitor
describe('Api planning controller', function () {

    before(function(done) {
        this.timeout(0);
        Context.auth(done);
    });

    beforeEach(function(done) {
        this.timeout(600);
        Context.clean(done);
    });

    it('[GET] /api/planning', function(done) {
        var plannings = Helper.build.form(
          Helper.build.associate('playlist', [__plannings[0]], [[0]], __playlists), {monitor: null}
        )

        Context.server
        .get('/api/planning')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("planning:get:success"),
            plannings   : plannings
        }, done);
    });

    it('[GET] /api/planning/1', function(done) {
        var plannings = Helper.build.form(__plannings, {monitor: null})

        Context.server
        .get('/api/planning/1')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("planning:getone:success", 1),
            planning    : plannings[0]
        }, done);
    });

    it('[GET] /api/planning/2', function(done) {
        Context.server
        .get('/api/planning/2')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message : Message.get("planning:getone:failure")
        }, done);
    });

    it('[GET] /api/planning/999', function(done) {
        Context.server
        .get('/api/planning/999')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message : Message.get("planning:getone:failure")
        }, done);
    });

});
