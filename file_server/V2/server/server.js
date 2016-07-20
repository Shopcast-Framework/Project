/*
** Server.js for FS for Shopcast
**
*/


//Loading libraries
var BinaryServer = require('binaryjs').BinaryServer;
var video = require('./video');
var fs = require('fs');

//Loading Sequalize
//require('./modules/orm').load();
/*
orm.load()
var ormFile = orm.db.File;
ormFile.findAll({
    where : { user_id: 3 }
}).then(function (files) {
    console.log('Following files retrieved');
    files.forEach(function (file) {
        console.log('[' + file.user_id + ']' + 
                    file.filename + ' : STATUS ' + file.description)
    });
});
//Test orm, to be deleted
*/

//FS server init and launch
var server = BinaryServer({port : 9000});

console.log('Running BinaryServer on port 9000')

server.on('connection', function(client) {
    console.log('We have a connection incoming !')
    client.on('stream', function(stream, meta) {
        switch (meta.event) {
            // Here we have the different commands

            // List available videos
            // It is a test command that will be replaced
            case 'list' :
                video.list(stream, meta);
                break;

            // Request a video, thie command will have its synthax changed later
            case 'request' :
                video.request(client, meta);
                break;

            // Command to be removed, test purposes
            case 'upload':
            default:
                video.upload(stream, meta);

          }
    });
});
