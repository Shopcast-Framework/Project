var fs = require('fs');
var uploadPath = __dirname + '/../uploads';

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

    // Need to export this to another function 'download'
    var file = fs.createReadStream(filename);
    var data = {
        name  : meta.name,
        size  : file.size,
        type  : file.type
    }
    data.event = 'download'
    client.send(file, data);

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
