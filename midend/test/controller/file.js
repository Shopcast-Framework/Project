var Context     = require(process.env.NODE_PATH + '/test/context.js'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    __files     = require(process.env.NODE_PATH + '/test/fixtures/file.json'),
    Helper      = Context.Helper;

describe('Api file controller', function () {

    before(function(done) {
        this.timeout(0);
        Context.auth(done);
    });

    beforeEach(function(done) {
        this.timeout(300);
        Context.clean(done);
    });

    it('[GET] /api/file', function(done) {
        Context.server
        .get('/api/file')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message     : Message.get("file:get:success"),
            files       : __files.slice(0, 2)
        }, done);
    });

    it('[POST] /api/file', function(done) {
        var newFile = Helper.build.new('File', __files[__files.length - 1]);

        Context.server
        .post('/api/file')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .send(newFile)
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("file:post:success"),
            file    : newFile
        }, done);
    });

    it('[GET] /api/file/1', function(done) {
        Context.server
        .get('/api/file/1')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message     : Message.get("file:getone:success", 1),
            file        : __files[0]
        }, done);
    });

    it('[GET] /api/file/999 (Invalid id)', function(done) {
        Context.server
        .get('/api/file/999')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(400, {
            message     : Message.get("file:getone:failure", 1)
        }, done);
    });

    it('[PUT] /api/file/1', function(done) {
        var editFile = Helper.build.edit('File', __files[0]);

        Context.server
        .put('/api/file/1')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .send(editFile)
        .expect(Helper.date.truncate)
        .expect(200, {
            message     : Message.get("file:put:success"),
            file        : editFile
        }, done);
    });

    it('[PUT] /api/file/999 (Invalid id)', function(done) {
        var editFile = Helper.build.edit('File', __files[0]);

        Context.server
        .put('/api/file/999')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .send(editFile)
        .expect(Helper.date.truncate)
        .expect(300, {
            message: Message.get("file:put:failure")
        }, done);
    });

    it('[DELETE] /api/file/1', function(done) {
        Context.server
        .del('/api/file/1')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("file:delete:success")
        }, done);
    });

    it('[DELETE] /api/file/999', function(done) {
        Context.server
        .del('/api/file/999')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(400, {
            message : Message.get("file:delete:failure")
        }, done);
    });

});
