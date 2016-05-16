var request     = require('supertest'),
    passport    = require('passport'),
    server      = request.agent(require(process.env.NODE_PATH + '/server.js')),
    Message     = require(process.env.NODE_PATH + '/modules/messages'),
    Cleaner     = require('../database_cleaner.js'),
    Helper      = require('../helper.js'),
    __users     = require('../fixtures/user.json');

describe('Api user', function () {
    var currentUser = __users[0],
        token,
        ok = true;

    function auth(done) {
        Cleaner.clean().then(function() {
            server
            .post('/api/session')
            .set('Content-Type', 'application/json')
            .send({'strategy': 'local', 'username': currentUser.username, 'password': currentUser.password})
            .expect(function(res) {
                token = res.body.user.token;
            })
            .end(done);
        });
    };

    before(function(done) {
        auth(done);
    });

    beforeEach(function(done) {
        if (ok) {
            done();
        } else {
            Cleaner.clean().then(done);
        }
        ok = false;
    });

    it('[GET] /', function(done) {
        server
        .get('/api/user')
        .set({'Content-Type' : 'application/json', 'Authorization': token})
        .expect(Helper.date.truncate)
        .expect(200, {
            message : Message.get("user:get:success"),
            users   : __users
        }, done);
    });

});
