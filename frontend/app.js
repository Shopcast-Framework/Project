'use strict';

var express = require('express'),
    http = require('http'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    app = express(),
    session = require('express-session'),
    server = http.createServer(app),
    Rest = require('./rest');

app.close = function() {
    server.close();
};

app.listen = function() {
    server.listen(config.port, function(){
        console.log('Express server listening on port ' + server.address().port + ' in ' + app.settings.env + ' mode');
    });
};

app.run = function(){

    app.set('view engine', 'jade');
    app.use('/css', express.static(__dirname + '/public/css'));
    app.use('/js', express.static(__dirname + '/public/js'));
    app.use('/images', express.static(__dirname + '/public/images'));
    app.use('/font', express.static(__dirname + '/public/font'));
    app.use('/public', express.static(__dirname + '/public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({ name: 'connect.sid2', secret: 'keyboard cat', resave: true, saveUninitialized: true }));
    app.use(Rest.middleware);

    app.use('/dashboards', require('./routes/dashboards'));
    app.use('/friends', require('./routes/friends'));
    app.use('/playlists', require('./routes/playlists'));
    app.use('/plannings', require('./routes/plannings'));
    app.use('/users', require('./routes/users'));
    app.use('/signin', require('./routes/signin'));
    app.use('/session', require('./routes/session'));


    app.listen();
    return server;
};

module.exports = app;
