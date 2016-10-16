var Status              = require(process.env.NODE_PATH + '/config/status.json'),
    Context             = require(process.env.NODE_PATH + '/test/context.js'),
    Message             = require(process.env.NODE_PATH + '/modules/messages'),
    __plannings         = require(process.env.NODE_PATH + '/test/fixtures/planning.json'),
    __playlists         = require(process.env.NODE_PATH + '/test/fixtures/playlist.json'),
    __playlist_files    = require(process.env.NODE_PATH + '/test/fixtures/playlist_file.json'),
    __files             = require(process.env.NODE_PATH + '/test/fixtures/file.json'),
    Helper              = Context.Helper;

describe('Api playlist controller', function () {

    before(function(done) {
        this.timeout(0);
        Context.auth(done);
    });

    beforeEach(function(done) {
        this.timeout(600);
        Context.clean(done);
    });

    it('[GET] /api/playlist', function(done) {
        var files = Helper.build.associate('PlaylistFile', __files, [[0], [], []], __playlist_files)
        var playlists = Helper.build.associate('files', [__playlists[0], __playlists[1]], [[0], []], files);
        playlists = Helper.build.associate('plannings', playlists, [[0, 1], []], __plannings);

        Context.server
        .get('/api/playlist')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("playlist:get:success"),
            playlists   : playlists
        }, done);
    });

    it('[POST] /api/playlist', function(done) {
        var newPlaylist = Helper.build.new('Playlist', __playlists[__playlists.length - 1], {user_id:1});

        Context.server
        .post('/api/playlist')
        .set(Context.header())
        .send(newPlaylist)
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("playlist:post:success"),
            playlist    : newPlaylist
        }, done);
    });

    it('[GET] /api/playlist/1', function(done) {
        var files = Helper.build.associate('PlaylistFile', __files, [[0], [], []], __playlist_files)
        var playlists = Helper.build.associate('plannings', [__playlists[0]], [[0, 1]], __plannings);
        var playlist = Helper.build.associate('files', playlists, [[0]], files);

        Context.server
        .get('/api/playlist/1')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("playlist:getone:success", 1),
            playlist    : playlist[0]
        }, done);
    });

    it('[GET] /api/playlist/999 (Invalid id)', function(done) {
        Context.server
        .get('/api/playlist/999')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message     : Message.get("playlist:getone:failure")
        }, done);
    });

    it('[PUT] /api/playlist/1', function(done) {
        var editPlaylist = Helper.build.edit('Playlist', __playlists[0]);

        Context.server
        .put('/api/playlist/1')
        .set(Context.header())
        .send(editPlaylist)
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message     : Message.get("playlist:put:success"),
            playlist    : editPlaylist
        }, done);
    });

    it('[PUT] /api/file/999 (Invalid id)', function(done) {
        var editPlaylist = Helper.build.edit('Playlist', __playlists[0]);

        Context.server
        .put('/api/playlist/999')
        .set(Context.header())
        .send(editPlaylist)
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message     : Message.get("playlist:put:failure")
        }, done);
    });

    it('[DELETE] /api/playlist/1', function(done) {
        Context.server
        .del('/api/playlist/1')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.OK, {
            message : Message.get("playlist:delete:success")
        }, done);
    });

    it('[DELETE] /api/playlist/999', function(done) {
        Context.server
        .del('/api/playlist/999')
        .set(Context.header())
        .expect(Helper.date.truncate)
        .expect(Status.UNAUTHORIZED, {
            message : Message.get("playlist:delete:failure")
        }, done);
    });

});
