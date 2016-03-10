'use strict';

var express = require('express'),
    routes  = require('./routes'),
    http = require('http'),
    config = require('./config'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
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
    app.use(cookieParser());
    app.use(session({ name: 'connect.sid2', secret: 'keyboard cat', resave: true, saveUninitialized: true }));
    app.use(Rest.middleware);

    //app.use('/', routes.home);
    app.use('/dashboards', routes.dashboards);
    app.use('/signin', routes.signin);
    app.use('/session', routes.session);
    app.use('/files', routes.files);
    app.use('/playlists', routes.playlists);
    app.use('/users', routes.users);
    app.use('/display', routes.display);
    app.use('/settings', routes.settings);

    app.listen();
    return server;
};

module.exports = app;
