'use strict';

var express     = require('express'),
    router      = express.Router(),
    Promise     = require('promise'),
    Busboy      = require('busboy'),
    Rest        = require('../rest'),
    menu        = require(__dirname + '/../modules/menu'),
    middlewares = require('../middlewares'),
    humanize    = require('humanize'),
    translate   = require('../languages');

router.post('/', middlewares.isLogged, function(req, res) {
    var body = {};
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('field', function(name, value) {
        body[name] = value;
    });
    busboy.on('file', function(fieldname, fileStream, filename, encoding, mimetype) {
        body["mimetype"] = mimetype;
        body["encoding"] = encoding;
        body["originalname"] = filename;
        var buff = [];
        fileStream.on('data', function(chunk) {
            buff.push(chunk);
        });
        fileStream.on('end', function() {
            body["data"] = Buffer.concat(buff);
        });
    });
    busboy.on('finish', function() {
        Rest.post('file', JSON.stringify(body, function (key, value) {
            return value instanceof Buffer ? value.toString('base64') : value;
        }))
        .then(function(data) {
            res.redirect('/files?message=Files correctly upload');
        }, function(err) {
            console.log(err);
            res.redirect('/files?message=Files can\'t be upload');
        });
    });
    req.pipe(busboy);
});

router.post('/:id', middlewares.isLogged, function(req, res) {
    var id = req.params.id;

    Rest.put('file/' + id, JSON.stringify(req.body)).then(function(response) {
        res.redirect('/files/' + id + '?message=' + response.body.message);
    }, function(err) {
        console.log(err);
        res.redirect('/files/' + id + '?message=' + response.body.message);
    })
});

router.get('/delete/:id', middlewares.isLogged, middlewares.language, function( req, res ) {
	var promises = [];
	var id = req.params.id;

	promises.push(Rest.delete('file/' + id));
	Promise.all(promises).then(function(response) {
		res.redirect('/files?message=' + response[0].body.message );
	}, function(err) {
		console.log(err);
		res.redirect('/files?message=' + err.body.message);
	});
});

router.get('/:id/playlist/add/:id_playlist', middlewares.isLogged, middlewares.language, function( req, res ) {
    var id = req.params.id;
    var id_playlist = req.params.id_playlist;

    var url = 'playlist/' + id_playlist + '/add';

	Rest.post(url, JSON.stringify([id])).then(function(response) {
		console.log(response);
		res.redirect('/files/'+id+'?message=' + response.body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/files/'+id+'?message=' + err.body.message);
	});
});

router.get('/:id', middlewares.isLogged, middlewares.language, function( req, res ) {
	var promises = [];
	var id = req.params.id;

	promises.push(Rest.get('file/' + id));
	promises.push(Rest.get('playlist'));
	promises.push(menu.load(req.session.user));

	Promise.all(promises).then(function(values) {

		var file = values[0].body.file;
		file.size = humanize.filesize(file.size);
		file.playlistsId = [];

		var playlists = values[1].body.playlists;
		values[1].body.playlists.forEach(function(element,index,array){
			if ( playlists[index].tags != null )
				playlists[index].tags = element.tags.split(",");
		});

		res.render('files/show', {
			active: 'files',
			menu: values[2],
			file: file,
			playlists: playlists,
			isLogged: true,
			isSearchBar: false,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "File", { title: file.name, tabTitle: file.name } ),
			language: req.cookies.language
		});
	}, function(err) {
		console.log(err);
		res.redirect('/dashboards?message=' + err.body.message);
	});
});

router.get('/', middlewares.isLogged, middlewares.language, function( req, res ) {

	var promises = [];

	promises.push(Rest.get('file'));
	promises.push(menu.load(req.session.user));

	Promise.all(promises).then(function(values) {

		var files = values[0].body.files;
		values[0].body.files.forEach(function(element,index,array){
			if ( files[index].tags != null )
				files[index].tags = element.tags.split(",");

			files[index].size = humanize.filesize(files[index].size);
		});

		res.render('files/list', {
			active: 'files',
			menu: values[1],
			files: files,
			isLogged: true,
			isSearchBar: true,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Files", { title: files.length } ),
			language: req.cookies.language
		});
	}, function(err) {
		console.log(err);
		res.redirect('/dashboards?message=' + err.body.message);
	});
});

module.exports = router;
