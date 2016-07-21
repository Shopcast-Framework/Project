'use strict';

var express = require('express'),
	router = express.Router(),
	Promise = require('promise'),
	Rest	= require('../rest'),
	menu    = require(__dirname + '/../modules/menu'),
	upload  = require('multer')({
          dest              : 'uploads/'
        }),
	middlewares = require('../middlewares'),
        probe     = require('node-ffprobe'), 
	humanize = require('humanize'),
	translate = require('../languages');

router.post('/',middlewares.isLogged, upload.any(), function(req, res) {

	if (req.files && req.files[0]) {
		var file = req.files[0];
		for (var k in file) {
                  req.body[k] = file[k];
                }
	}

        probe(file.path, function(err, probeData) {
            var duration = 0;

            if (probeData && probeData.format && !isNaN(probeData.format.duration)) {
                duration = probeData.format.duration;
            }
            if (req.files && req.files[0]) {
                req.body['duration'] = duration;
            }

	    Rest.post('file', JSON.stringify(req.body)).then(function() {
	    	res.redirect('/files?message=Files correctly upload');
	    }, function(err) {
	    	console.log(err);
	    	res.redirect('/files?message=Files can\'t be upload');
	    });

        });
});

router.post('/:id',middlewares.isLogged, function(req, res) {

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
	Promise.all(promises).then(function() {
		console.log(res);
		res.redirect('/files?message=Successfully deleted');
	}, function(err) {
		console.log(err);
		res.redirect('/files?message=An error occured');
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
