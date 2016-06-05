var BinaryClient = require('binaryjs').BinaryClient;
var fs = require('fs');
var downloadPath = __dirname + '/../download';


var client = BinaryClient('ws://localhost:9000')

console.log('A BinaryClient tries to connect to ws://localhost:9000');

function emit(event, data, file) {
    file = file || {};
    data = data || {};
    data.event = event;

    return client.send(file, data);
}

// Functions for routes (based on server), export later to video.js

function list(cb) {
    console.log('CMD [LIST] to BinaryServer');
    var stream = emit('list');

    stream.on('data', function(data) {
        cb(null, data.files);
    });
    stream.on('error', cb);
}

function upload(file, cb) {
    console.log('CMD [UPLOAD] to BinaryServer');
}

function request(name) {
    console.log('CMD [REQUEST] to BinaryServer');
    emit('request', {name : name});
}

function download(stream, meta, cb) {
    console.log('CMD [DOWNLOADING] from BinaryServer');
    /*
    No check for file support
    */

    console.log(meta.name);

    var file = fs.createWriteStream(downloadPath + '/' + meta.name);
    stream.pipe(file);

    stream.on('data', function (data) {
        stream.write(data);
    });
    stream.on('end', function () {
        console.log('[DOWNLOAD] ' + meta.name + ' : Finished');
        stream.write({
            end: true
        });
    });
     
}

function setupList(err, files) {
    files.forEach(function (file) {
        console.log('[SETUPLIST] file : ' + file);
    });
}

client.on('open', function() {
  console.log('Connection to Binary Server initialized');

  // List of functions to execute for testing
  list(setupList);
  //download a file StellarMoon.png
  request('StellarMoon.png');
});

client.on('stream', function(stream, meta) {
  console.log('The only water in the forest is the river.');
  download(stream, meta, function(err, src) {
      // Some error handling
  });
});

