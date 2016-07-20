var fs = require('fs');
var uploadPath = __dirname + '/../uploads';

// Import orm, will be upgraded
// Temporary settings about the user id
var orm = require(process.env.NODE_PATH + '/modules/orm');
orm.load();
var ormFile = orm.db.File;
var ormMonitor = orm.db.Monitor;
var ormUser = orm.db.User;

module.exports = {
  list          : list,
  request       : request,
  upload        : upload,
  monitor_login : monitor_login,
  timetable     : timetable
};

function timetable(stream, meta) {
    console.log('Command [TIMETABLE] [USER ID :' + meta.client_data.user_id +' ]: ');

    from = new Date(meta.from);
    to = new Date(meta.to);

    ormTimetable.find({
      where : {
        startime : {
          gte : from,
          lte : to
        },
        idmonitor : idmonitor,
        updated_at : {
          gt : update_time
        }
      }
    }).then(function(timetables) {
        timetables.forEach(function(table) {
            emit('playlist', table);
            stream.write(table);
        })
    }, function(err) {
    });
    
}

function list(stream, meta) {
    console.log('Command [LIST] [USER ID :' + meta.client_data.user_id +' ]: ');
    fs.readdir(uploadPath, function(err, files) {

        console.log('Writing to client about files' + files);
        stream.write({files : files});
    });
}

function request(client, meta) {
    // need add checks
    var filename = uploadPath + '/' + meta.name;
    console.log('Command [REQUEST] [USER_ID : ' + meta.client_data.user_id + ' ]' + filename);

    ormFile.findOne({
        where : {
            user_id : meta.client_data.user_id,
            filename : meta.name
        }
    }).then(function (fileToSend) {

        if (!fileToSend) {
            console.log('[ERR] File ' + meta.name +' does not exist or no access');
            return ;
        }
        console.log('[USER HAS ACCESS]' + fileToSend.filename);
        
        // Need to export this to another function 'download'
        var file = fs.createReadStream(uploadPath + '/' + fileToSend.filename);
        var data = {
            name  : meta.name,
            size  : file.size,
            type  : file.type
        }
        data.event = 'download'
        client.send(file, data);

    }, function (err) {
        console.log('[DB] Access unauthorized.');
    });
  }

function upload(stream, meta) {
    console.log('Command [UPLOAD] : Allow file uplaod')

    /* Neeed to check filetupe
    if (!supportedType.indexOf(meta.type)) {
        stream.write({
            err: 'Unsupported type ' + meta.type
        });
        stream.end();
        return ;
    }*/

    // Create file in the upload path
    var file = fs.createWriteStream(uploadPath + '/' + meta.name);
    stream.pipe(file);

    stream.on('data', function (data) {
        stream.write(data);
    });
    strem.on('end', function () {
        stream.write({
            end: true
        });
    });
}

function download(stream, cb) {
    console.log('Command [DOWNLOAD] not implemented directly');
}

function monitor_login(client, meta) {
    console.log('Client logging in with [UID :' + meta.id +']');

    ormMonitor.find({
        where: {
            uid: meta.id
        }, include : [{model : ormUser, as : 'user'}]
    }).then(function(monitor) {
        if (!monitor) {
            // tell client you failed
            console.log('[ERR] Uid not found');
            return ;
        }
        console.log('Uid valid');
        client.data = { 
            user_id       : monitor.user_id,
            monitor_id    : monitor.id,
            access_level  : 1, //default, does not mean a thing, yet
            is_identified : true
        };
        console.log(client.data);
        console.log('Now We need the recover this data');
        client.send({}, {event : 'identify', identify : meta.id});

    }, function(err) {
        console.log('[ERR] Identification failure');
        // tell client you failed
    })
}
