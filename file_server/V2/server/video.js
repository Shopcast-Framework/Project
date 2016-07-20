var fs = require('fs');
var uploadPath = __dirname + '/../uploads';

// Import orm, will be upgraded
// Temporary settings about the user id
var orm = require(process.env.NODE_PATH + '/modules/orm');
orm.load();
var ormFile = orm.db.File;

clientUserId = 2;

module.exports = {
  list      : list,
  request   : request,
  upload    : upload
};

function list(stream, meta) {
    console.log('Command [LIST] : ');
    fs.readdir(uploadPath, function(err, files) {

        console.log('Writing to client about files' + files);
        stream.write({files : files});
    });
}

function request(client, meta) {
    // need add checks
    var filename = uploadPath + '/' + meta.name;
    console.log('Command [REQUEST] ' + filename);

    ormFile.findOne({
        where : {
            user_id : clientUserId,
            filename : meta.name
        }
    }).then(function (fileToSend) {

        if (!fileToSend) {
            console.log('[ERR] File ' + meta.name +' does not exist or no access');
            return ;
        }
        console.log('[USER HAS ACCESS]' + fileToSend.filename);
        
        // Need to export this to another function 'download'
        var file = fs.createReadStream(uploadPath + '/' + fileToSend.path);
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
