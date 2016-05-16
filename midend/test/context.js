var __users = require(process.env.NODE_PATH + '/test/fixtures/user.json');

var Context = function() {
    var self = this;

    self.init = function() {
        self.token = null;
        self.request = require('supertest');
        self.server = self.request.agent(require(process.env.NODE_PATH + '/server.js'));
        self.cleaner = require(process.env.NODE_PATH + '/test/database_cleaner.js');
        self.cleaned = false;
        self.authentified = false;
    };

    self.__auth = function(done) {
        var currentUser = __users[0];

        self.cleaner.clean().then(function() {
            self.cleaned = true;
            self.server
            .post('/api/session')
            .set('Content-Type', 'application/json')
            .send({'strategy': 'local', 'username': currentUser.username, 'password': currentUser.password})
            .expect(function(res) {
                self.token = res.body.user.token;
            })
            .end(function() {
                self.authentified = true;
                done();
            });
        });
    };

    self.auth = function(done) {
        if (!self.authentified) {
            self.__auth(done);
        } else {
            done();
        }
    };

    self.clean = function(done) {
        if (!self.cleaned) {
            self.cleaner.clean().then(done);
        } else {
            done();
        }
        ok = false;
    }

    self.init();
    return self;
};

module.exports = new Context();
