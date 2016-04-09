'use strict';

var express = require('express'),
	router = express.Router(),
	Promise = require('promise'),
	Rest	= require('../rest'),
	menu    = require(__dirname + '/../menu.json'),
	upload  = require('multer')({ dest: 'uploads/' });

router.post('/', upload.any(), function(req, res) {

	var promises = [];

	for (var i in req.files) {
		promises.push(Rest.post('file', JSON.stringify(req.files[i])));
	}
	Promise.all(promises).then(function() {
		res.redirect('/files?message=Files correctly upload');
	}, function(err) {
		console.log(err);
		res.redirect('/playlists?message=Files can\'t be upload');
	});
});

router.get('/new', function(req, res) {
	res.render('files/new', {
		title: 'Shopcast - Playlists',
		titleContent: 'New playlist',
		active: '/playlists',
		menu: menu
	});
});

router.post('/:id', function(req, res) {
	console.log(req.body);
	Rest.put('file/' + req.params.id, JSON.stringify(req.body)).then(function(response) {
		console.log(response);
		res.redirect('/files?message=' + response.body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/files?message=' + err.body.message);
	});
});

router.get('/:id', function(req, res) {
	var promises = [];

	promises.push(Rest.get('file/' + req.params.id));

	Promise.all(promises).then(function(values) {
		var file = values[0].body.file;

		res.render('files/show', {
			title: 'Shopcast - File',
			titleContent: 'My file (' + file.filename + ')',
			active: '/files',
			file: file,
			menu: menu
		});
	})
});

router.get('/', function(req, res) {
	var promises = [];

	promises.push(Rest.get('file'));

	Promise.all(promises).then(function(values) {
		var files = values[0].body.files;

		res.render('files/index', {
			title: 'Shopcast - Files',
			titleContent: 'My files (' + files.length + ')',
			active: '/files',
			files: files,
			menu: menu
		});
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;
