var Status      = require(process.env.NODE_PATH + '/config/status.json'),
    Context     = require(process.env.NODE_PATH + '/test/context.js'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    __files     = require(process.env.NODE_PATH + '/test/fixtures/file.json'),
    __playlists = require(process.env.NODE_PATH + '/test/fixtures/playlist.json'),
    __playlist_files = require(process.env.NODE_PATH + '/test/fixtures/playlist_file.json'),
    Helper      = Context.Helper;

describe('Api file controller', function () {

    before(function(done) {
        this.timeout(0);
        Context.auth(done);
    });

    beforeEach(function(done) {
        this.timeout(600);
        Context.clean(done);
    });

    it('[GET] /api/file', function(done) {
        var playlists = Helper.build.associate(
            'PlaylistFile',
            __playlists, [[0], [], []],
            __playlist_files
        )
        var files = Helper.build.associate(
            'playlists',
            __files.slice(0, 2), [[0], []],
            playlists
          );

        Context.server
        .get('/api/file')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("file:get:success"),
            files       : files
        }, done);
    });

    it('[POST] /api/file', function(done) {
        var playlists = Helper.build.associate(
            'PlaylistFile',
            __playlists, [[0], [], []],
            __playlist_files
        )
        var files = Helper.build.associate(
            'playlists',
            __files.slice(0, 2), [[0], []],
            playlists
          );

        Context.server
        .get('/api/file')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("file:get:success"),
            files       : files
        }, done);
    });

    it('[GET] /api/file/1', function(done) {
        Context.server
        .get('/api/file/1')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("file:getone:success", 1),
            file        : __files[0]
        }, done);
    });

    it('[GET] /api/file/999 (Invalid id)', function(done) {
        Context.server
        .get('/api/file/999')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message     : Message.get("file:getone:failure", 1)
        }, done);
    });

    it('[PUT] /api/file/1', function(done) {
        var editFile = Helper.build.edit('File', __files[0]);

        Context.server
        .put('/api/file/1')
        .set(Context.header())
        .send(editFile)
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("file:put:success"),
            file        : editFile
        }, done);
    });

    it('[PUT] /api/file/999 (Invalid id)', function(done) {
        var editFile = Helper.build.edit('File', __files[0]);

        Context.server
        .put('/api/file/999')
        .set(Context.header())
        .send(editFile)
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message: Message.get("file:put:failure")
        }, done);
    });

    it('[DELETE] /api/file/1', function(done) {
        Context.server
        .del('/api/file/1')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message : Message.get("file:delete:success")
        }, done);
    });

    it('[DELETE] /api/file/999', function(done) {
        Context.server
        .del('/api/file/999')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message : Message.get("file:delete:failure")
        }, done);
    });

});
