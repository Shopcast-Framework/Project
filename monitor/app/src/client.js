const remote = require('electron').remote;

var BinaryClient = require('binaryjs').BinaryClient;
var fs = require('fs');
var downloadPath = __dirname + '/../files';
var sleep = require('sleep');

var client = BinaryClient('ws://shopcast.fr:9000')

client.waitPlaylists = {};
client.waitFiles = [];
client.waitPlannings = [];
client.readyFiles = []
console.log('A BinaryClient tries to connect to ws://localhost:9000');


module.exports = {
    requestFile : request, // requestFile(file_id)
    requestTimetable : timetable, // Timetable(from, to)
    requestPlaylist : playlistInfo, // playlistInfo(plaulist_id) 
}

client.data = {
  uid : '', //test
  is_identified : false,
  timetable : [],
  fileToDownload : [],
  fileData : {},
  fileAvailable : {
  }
};

client.data = require(__dirname + '/../clientdata.json');

function saveClientData() {
    var tmpbool = client.data.is_identified;
    client.data.is_identified = false;
    fs.writeFile('./app/clientdata.json', JSON.stringify(client.data) , 'utf-8');
    client.data.is_identified = tmpbool;

}
saveClientData();


function downloadFiles() {
    console.log('Downloading file queue');
    for (var i = 0, len = client.data.fileToDownload.length; i < len; i++) {
        var tmp = client.data.fileData[client.data.fileToDownload[i]];
        request(tmp.file_id);
    }

}

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

    console.log("DATE NOW : " + from.toString());
    console.log("DATE THEN : " + to.toString());
    console.log('CMD [TIMETABLE]');
    emit('timetable', {
      from : from,
      to : to
    });
}

function playlistInfo(play_id) {
    console.log('CMD [PLAYLIST INFO]');
    emit('playlistinfo', {
        playlist_id : play_id
    });
}

function request(id) {
    console.log('CMD [REQUEST] to BinaryServer');
    emit('request', {file_id : id});
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
        client.readyFiles.push(meta.file_data);
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
    if (files == null) {
        console.log('SETUP LIST NOPE');
    }
    
        console.log('[SETUPLIST] file : ' + files);
    files.forEach(function (file) {
        console.log('[SETUPLIST] file : ' + file);
    });
}

function recievePlaylist(stream, meta, err) {
    console.log('I recieve.... things for playlist');
    console.log(meta);

    var play = {
        id : meta.playlist_id,
        name : meta.playlist_name,
        desc : meta.playlist_desc,
        tags : meta.playlist_tags,
        files : meta.playlist_files,
        status : true
    }
    for (var i = 0; i < play.files.length; i++) {
        if (client.waitFiles.indexOf(play.files[i]) == -1) {
            client.waitFiles.push(play.files[i]);
        }
    }
    client.waitPlaylists[play.id] = play;
}


function recieveTimetable(stream, meta, err) {
    console.log('I recieve.... things for timetable');
    console.log(meta);

    var planning = meta.planning;
    var playlists = meta.playlists;
    var timestamp = meta.timestamp;
    for (var i = 0; i < playlists.length; i++) {
      if (playlists[i] in client.waitPlaylists == false) {
        client.waitPlaylists[playlists[i]] = {id : playlists[i], status : false};
      }
    }
    client.waitPlannings.push({planning : planning,
                                timestamp : timestamp,
                                  from : meta.from, to : meta.to});
}



client.commands = function() {
  //list(setupList);
    
    from = new Date('2016-09-19');
    to = new Date();
    to.setDate(from.getDate() + 7);
   

  // Download unaccessible files
  //request('DaveRose.png');
  // Download accessible files
  //request('StellarMoon.png');
  //request('SurfingDeath.jpg');
  //get timetable
  //timetable(from, to); // Timetable to client data in an undertdable way
  ///playlistInfo(18);
  //request(18);
  // download the files that you need
  /*
  saveClientData();
  process.exit();
  */
};

client.on('open', function() {
  console.log('Connection to Binary Server initialized');

  identify(client.data.uid); 
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
      
      case 'playlistinfoback' :
          recievePlaylist(stream, meta, function(err, src) {
          });
          break;

      case 'timetable' :
          recieveTimetable(stream, meta, function(err, src) {
          });
          break;

      default :
          download(stream, meta, function(err, src) {
          // Some error handling
          });
  }
});

