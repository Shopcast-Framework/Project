var Context     = require(process.env.NODE_PATH + '/test/context.js'),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    Cleaner     = require(process.env.NODE_PATH + '/test/database_cleaner.js'),
    Helper      = require(process.env.NODE_PATH + '/test/helper.js'),
    __users     = require(process.env.NODE_PATH + '/test/fixtures/user.json');

describe('Api user', function () {

    before(function(done) {
        this.timeout(0);
        Context.auth(done);
    });

    beforeEach(function(done) {
        this.timeout(300);
        Context.clean(done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

    it('[GET] /', function(done) {
        Context.server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': Context.token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

});
