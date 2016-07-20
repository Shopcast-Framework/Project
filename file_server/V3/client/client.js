var BinaryClient = require('binaryjs').BinaryClient;
var fs = require('fs');
var downloadPath = __dirname + '/../download';
var sleep = require('sleep');

var client = BinaryClient('ws://localhost:9000')


console.log('A BinaryClient tries to connect to ws://localhost:9000');

function emit(event, data, file) {
    file = file || {};
    data = data || {};
    data.event = event;

    return client.send(file, data);
}

// Functions for routes (based on server), export later to video.js
function identify(id) {
    console.log('CMD [IDENTIFY] with a user_id ' + id);
    var stream = emit('identify', {id : id});
}

function list(cb) {
    console.log('CMD [LIST] to BinaryServer');
    var stream = emit('list');

    stream.on('data', function(data) {
        cb(null, data.files);
    });
    stream.on('error', cb);
}

function timetable(from, to) {
    console.log('CMD [TIMETABLE]');
    emit('timetable', {
      from : from,
      to : to
    });
}

function playlist() {
    console.log('CMD recieving [PLAYLIST] from BinarysServer');


    // updating info localy
    // check what does not work anymore...
    // deleted things ?
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

function identity() {
    console.log('YOU HAVE BEEN IDENTITIED');
}

function setupList(err, files) {
    files.forEach(function (file) {
        console.log('[SETUPLIST] file : ' + file);
    });
}

client.data = {
  uid : 534396167,
  is_identified : false,
  timetable : []
};

client.commands = function() {
  list(setupList);

  // Download unaccessible files
  request('Crows.png');
  request('DaveRose.png');
  // Download accessible files
  request('StellarMoon.png');
  request('SurfingDeath.jpg');
};

client.on('open', function() {
  console.log('Connection to Binary Server initialized');

  identify(client.data.uid); // hardwrittend, for now
  // List of functions to execute for testing
  //list(setupList);
});

client.on('stream', function(stream, meta) {
  console.log('The only water in the forest is the river.');
  switch (meta.event) {
      case 'identify' :
          console.log(client.data.is_identified);
          console.log('identify bastard');
          client.data.is_identified = true;
          console.log(client.data.is_identified);
          console.log('launching the eeeeeend');
          client.commands();
      
          break;
      default :
          download(stream, meta, function(err, src) {
          // Some error handling
          });
  }
});

