'use strict';

var express	= require('express'),
	router	= express.Router(),
	Promise	= require('promise'),
	Rest	= require('../rest'),
	menu	= require(__dirname + '/../modules/menu.js'),
	upload  = require('multer')({ dest: 'public/uploads/' });

router.post('/', function(req, res) {
	Rest.post('playlist', JSON.stringify(req.body)).then(function(response) {
		console.log(response);
		res.redirect('/playlists?message=' + response.body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/playlists?message=' + err.body.message);
	});
});

router.get('/new', function(req, res) {
	res.render('playlists/new', {
		title: 'Shopcast - Playlists',
		titleContent: 'New playlist',
		active: '/playlists',
		menu: menu.load(req.session.user)
	});
});

router.post('/delete', function(req, res) {
	var promises = [];

	for (var i in req.body.playlist) {
		promises.push(Rest.delete('playlist/' + req.body.playlist[i]));
	}
	Promise.all(promises).then(function() {
		res.redirect('/playlists');
	});
});

router.post('/:id/files', upload.any(), function(req, res) {

	var promises = [];

	for (var i in req.files) {
		promises.push(Rest.post('playlist/' + req.params.id + '/file', JSON.stringify(req.files[i])));
	}
	Promise.all(promises).then(function() {
		res.redirect('/playlists?message=Files correctly upload');
	}, function(err) {
		console.log(err);
		res.redirect('/playlists?message=Files can\'t be upload');
	});
});


router.post('/:id', function(req, res) {
	Rest.put('playlist/' + req.params.id, JSON.stringify(req.body)).then(function(response) {
		console.log(response);
		res.redirect('/playlists?message=' + response.body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/playlists?message=' + err.body.message);
	});
});

router.get('/:id', function(req, res) {
	var promises = [];

	promises.push(Rest.get('playlist/' + req.params.id));

	Promise.all(promises).then(function(values) {
		var playlist = values[0].body.playlist;

		console.log(playlist);

		res.render('playlists/show', {
			title: 'Shopcast - Playlists',
			titleContent: 'Show playlist',
			active: '/playlists',
			playlist: playlist,
			menu: menu.load(req.session.user)
		});
	}, function(err) {
		console.log(err);
	});
});

router.get('/', function(req, res) {
	var promises = [];

	promises.push(Rest.get('playlist'));

	Promise.all(promises).then(function(values) {
		var playlists = values[0].body.playlists;

		res.render('playlists/index', {
			title: 'Shopcast - Playlists',
			titleContent: 'My playlists (' + playlists.length + ')',
			active: '/playlists',
			playlists: playlists,
			menu: menu.load(req.session.user)
		});
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;
