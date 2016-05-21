var Context     = require(process.env.NODE_PATH + '/test/context.js'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    __playlists = require(process.env.NODE_PATH + '/test/fixtures/playlist.json'),
    __files     = require(process.env.NODE_PATH + '/test/fixtures/file.json'),
    Helper      = Context.Helper;

describe('Api playlist controller', function () {

    before(function(done) {
        this.timeout(0);
        Context.auth(done);
    });

    beforeEach(function(done) {
        this.timeout(300);
        Context.clean(done);
    });

    it('[GET] /api/playlist', function(done) {
        Context.server
        .get('/api/playlist')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message     : Message.get("playlist:get:success"),
            playlists   : __playlists.slice(0, 2)
        }, done);
    });

    it('[POST] /api/playlist', function(done) {
        var newPlaylist = Helper.build.new('Playlist', __playlists[__playlists.length - 1], {user_id:1});

        Context.server
        .post('/api/playlist')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .send(newPlaylist)
        .expect(Helper.date.truncate)
        .expect(200, {
            message     : Message.get("playlist:post:success"),
            playlist    : newPlaylist
        }, done);
    });

    it('[GET] /api/playlist/1', function(done) {
        var playlist = Helper.build.associate('Files', [__playlists[0]], [[0]], __files);

        Context.server
        .get('/api/playlist/1')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message     : Message.get("playlist:getone:success", 1),
            playlist    : playlist[0]
        }, done);
    });

    it('[GET] /api/playlist/999 (Invalid id)', function(done) {
        Context.server
        .get('/api/playlist/999')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(400, {
            message     : Message.get("playlist:getone:failure")
        }, done);
    });

    it('[PUT] /api/playlist/1', function(done) {
        var editPlaylist = Helper.build.edit('Playlist', __playlists[0]);

        Context.server
        .put('/api/playlist/1')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .send(editPlaylist)
        .expect(Helper.date.truncate)
        .expect(200, {
            message     : Message.get("playlist:put:success"),
            playlist    : editPlaylist
        }, done);
    });

    it('[PUT] /api/file/999 (Invalid id)', function(done) {
        var editPlaylist = Helper.build.edit('Playlist', __playlists[0]);

        Context.server
        .put('/api/playlist/999')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .send(editPlaylist)
        .expect(Helper.date.truncate)
        .expect(400, {
            message     : Message.get("playlist:put:failure")
        }, done);
    });

    it('[DELETE] /api/playlist/1', function(done) {
        Context.server
        .del('/api/playlist/1')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("playlist:delete:success")
        }, done);
    });

    it('[DELETE] /api/playlist/999', function(done) {
        Context.server
        .del('/api/playlist/999')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(400, {
            message : Message.get("playlist:delete:failure")
        }, done);
    });

});
