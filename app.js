var express = require('express')
    , routes  = require('./routes')
    , http = require('http')
    , config = require('./config')
    , bodyParser = require('body-parser')

var app = module.exports = express();
var server = http.createServer(app);

app.close = function() {
    server.close();
};

app.listen = function() {
    server.listen(config.port, function(){
        console.log("Express server listening on port " + server.address().port + " in " + app.settings.env + " mode");
    });
};

app.run = function(){

    app.set('view engine', 'jade');
    app.use('/css', express.static(__dirname + '/public/css'));
    app.use('/js', express.static(__dirname + '/public/js'));
    app.use('/images', express.static(__dirname + '/public/images'));
    app.use('/font', express.static(__dirname + '/public/font'));
    app.use('/public', express.static(__dirname + '/public'));
    app.use( bodyParser.json() );       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    app.get('/', routes.index);
    app.use('/files', routes.files);
    app.use('/playlists', routes.playlists);
    app.use('/users', routes.users);
    app.use('/display', routes.display);
    app.use('/settings', routes.settings);

    app.listen();
    return server;
};
