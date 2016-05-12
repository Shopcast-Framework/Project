var request = require('supertest'),
    cleaner = require('../database_cleaner.js'),
    musics = require('../fixtures/music.json');

describe('Api music', function () {
    var server;

    beforeEach(function (done) {
        server = require('../../server.js');
        cleaner.clean().then(done);
    });

    it('[GET] /', function(done) {
        request(server)
        .get('/api/music')
        .expect(200, {
            message : 'List of musics',
            musics  : musics
        }, done);
    });

    it('[GET] /', function(done) {
        request(server)
        .get('/api/music')
        .expect(200, {
            message : 'List of musics',
            musics  : musics
        }, done);
    });

    it('[GET] /', function(done) {
        request(server)
        .get('/api/music')
        .expect(200, {
            message : 'List of musics',
            musics  : musics
        }, done);
    });

    it('[GET] /', function(done) {
        request(server)
        .get('/api/music')
        .expect(200, {
            message : 'List of musics',
            musics  : musics
        }, done);
    });

    it('[GET] /', function(done) {
        request(server)
        .get('/api/music')
        .expect(200, {
            message : 'List of musics',
            musics  : musics
        }, done);
    });

    it('[GET] /', function(done) {
        request(server)
        .get('/api/music')
        .expect(200, {
            message : 'List of musics',
            musics  : musics
        }, done);
    });

});
