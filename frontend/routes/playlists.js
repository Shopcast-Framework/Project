'use strict';

var express	= require( 'express' ),
	router	= express.Router(),
	Promise	= require( 'promise' ),
	Rest	= require('../rest'),
	menu	= require(__dirname + '/../menu.json');

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
		menu: menu
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
			menu: menu
		});
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;
