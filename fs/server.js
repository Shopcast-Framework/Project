/*
** Server.js for FS for Shopcast
**
*/


//Loading libraries
var BinaryServer = require('binaryjs').BinaryServer;
var video = require('./video');
var fs = require('fs');
var async = require('async');
//var sleep = require('sleep');

//FS server init and launch
var server = BinaryServer({port : 9000});

console.log('Running BinaryServer on port 9000')

server.on('connection', function(client) {
    console.log('We have a connection incoming ! We are setting the user_id')
    client_data = {
        monitor_id    : 0,
        user_id       : 0,
        access_level  : 0,
        is_identified : false
    };
    counter = 0;
    client.data = client_data;
    client.launchCmd = function(stream, meta) {
        meta.client_data = client.data;
        console.log('incoming : ' + meta.event);
        switch (meta.event) {
            // Here we have the different commands

            // Client requests the timetable for a date // from, to, last_update
            case 'timetable':
                if (true || client.data.is_identified) {
                    console.log('[CHECK] : Client id : ' + client_data.user_id);
                    video.timetable(client, stream, meta);
                }
                else {
                    console.log('[ERR] Client not identified');
                }
                break ;

            // List available videos
            // It is a test command that will be replaced
            case 'list' :
                if (true || client.data.is_identified) {
                    console.log('[CHECK] : Client id : ' + client_data.user_id);
                    video.list(stream, meta);
                }
                else {
                    console.log('[ERR] Client not identified');
                }
                break;

            // Request a video, thie command will have its synthax changed later
            case 'request' :
                if (true || client_data.is_identified) {
                    console.log('[CHECK] : Client id : ' + client_data.user_id);
                    video.request(client, meta);
                }
                else {
                    console.log('[ERR] Client not identified');
                }
                break;

            // Command to be removed, test purposes
            case 'upload':
                if (true || client.data.is_identified) {
                    console.log('[CHECK] : Client id : ' + client_data.user_id);
                    video.upload(stream, meta);
                }
                else {
                    console.log('[ERR] Client not identified');
                }
                break;
            
            // Prototype for monitor authentification
            default:
            case 'identify' :
                video.monitor_login(client, meta);
          }
    };
    client.on('stream', client.launchCmd);
});
