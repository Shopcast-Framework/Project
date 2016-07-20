var BinaryClient = require('binaryjs').BinaryClient;
var fs = require('fs');
var downloadPath = __dirname + '/../download';
var sleep = require('sleep');

var client = BinaryClient('ws://localhost:9000')

client.data = require(__dirname + '/clientdata.json');

console.log(client.data);

client.data = {
  uid : 534396167,
  is_identified : false,
  last_update : null,
  timetable : [],
  fileToDownload : [],
  fileData : {},
  fileAvailable : {
  }
};

function saveClientData() {
    var tmpbool = client.data.is_identified;
    client.data.is_identified = false;
    fs.writeFile('./clientdata.json', JSON.stringify(client.data) , 'utf-8');
    client.data.is_identified = tmpbool;

}

function downloadFiles() {
    console.log('heeeeeello');
    for (var i = 0, len = client.data.fileToDownload.length; i < len; i++) {
        var tmp = client.data.fileData[client.data.fileToDownload[i]];
        request(tmp.file_id, tmp.filename);
    }

}

function orderPlanning() {
}

function addToPlanning(play) {
  for (var i = 0, len = play.planning.length; i < len; i++) {
      var day_start = new Date(play.planning[i].start);
      var time_start = new Date('2042-02-02 ' + play.planning[i].timestart)
      day_start.setHours(time_start.getHours());
      day_start.setMinutes(time_start.getMinutes());
      day_start.setSeconds(time_start.getSeconds());
      var start = day_start;
      if (start < Date.now()) {
          start = new Date(Date.now());
          start.setHours(time_start.getHours());
          start.setMinutes(time_start.getMinutes());
          start.setSeconds(time_start.getSeconds());
      }
      var end = new Date(play.planning[i].end);
      end.setHours(time_start.getHours());
      end.setMinutes(time_start.getMinutes());
      end.setSeconds(time_start.getSeconds());
      while (start < end) {
          var timeprogram = new Date(start)
          for (var i = 0, len = play.files.length; i < len; i++) {
              fileprogram = {
                  file_id : play.files[i].file_id,
                  filename : play.files[i].filename,
                  timelength : play.files[i].file_time,
                  timeprogram : timeprogram
              }
              timeprogram = new Date(timeprogram.getTime() + (fileprogram.timelength * 1000));
              client.data.timetable[client.data.timetable.length] = timeprogram;
              if (client.data.fileAvailable[fileprogram.file_id] == undefined &&
                  client.data.fileData[fileprogram.file_id] == undefined) {
                 client.data.fileData[fileprogram.file_id] = {
                      file_id : fileprogram.file_id,
                      filename : fileprogram.filename
                 }
                 client.data.fileToDownload[client.data.fileToDownload.length] = fileprogram.file_id;
              }
                  
          }
          start.setDate(start.getDate() + 1);
      }
  }
  downloadFiles();
}

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

function playlist(stream, meta, cb) {
    // recieving informaiton about playlists
    console.log('getting info about playlists');
    console.log(meta);
    addToPlanning(meta);

    stream.on('error', cb);
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
    from = new Date(Date.now());
    to = new Date();
    to.setDate(from.getDate() + 7);

    console.log("DATE NOW : " + from.toString());
    console.log("DATE THEN : " + to.toString());
    console.log('CMD [TIMETABLE]');
    emit('timetable', {
      from : from,
      to : to
    });
}

function upload(file, cb) {
    console.log('CMD [UPLOAD] to BinaryServer');
}

function request(id, name) {
    console.log('CMD [REQUEST] to BinaryServer');
    emit('request', {name : name, file_id : id});
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
        client.data.fileAvailable[meta.file_id] = meta.filename;
        saveClientData();
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

client.commands = function() {
  list(setupList);

  // Download unaccessible files
  //request('Crows.png');
  //request('DaveRose.png');
  // Download accessible files
  //request('StellarMoon.png');
  //request('SurfingDeath.jpg');
  //get timetable
  timetable(); // Timetable to client data in an undertdable way
  // download the files that you need
  /*
  saveClientData();
  process.exit();
  */
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
          client.data.is_identified = true;
          console.log(client.data.is_identified);
          client.commands();
          break;

      case 'playlist' :
          playlist(stream, meta, function(err, src) {
          });
          break ;

      default :
          download(stream, meta, function(err, src) {
          // Some error handling
          });
  }
});

