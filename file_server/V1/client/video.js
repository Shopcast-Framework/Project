var fs = require('fs');
var uploadPath = __dirname + '/uploads';

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

    var file = fs.createReadStream(filename);
    client.send(file);
}

function upload(stream, meta) {
    console.log('Command [UPLOAD] : not implemented');
}

function download(stream, cb) {
    console.log('Command [DOWNLOAD]');
}
