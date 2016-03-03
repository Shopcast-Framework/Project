'use strict';

var express = require( 'express' );
var router = express.Router();
var Promise = require( 'promise' );
var Rest = require('../rest');
var menu    = require(__dirname + '/../menu.json');
var middlewares = require('../middlewares');

router.post('/', function(req, res) {

	Rest.post('playlist', JSON.stringify(req.body)).then(function(response) {
		console.log(response);
		res.redirect('/playlists?message=' + response.message);
	}, function(err) {
		console.log(err);
		res.redirect('/playlists?message=' + err.message);
	});
});

// router.get('/new', function(req, res) {

// 	var promises = [];
// 	var menu = null;

// 	var promiseMenu = MenuModel.findAll({ where: { isActive: true }}).then(function(data) {
// 		return JSON.parse(JSON.stringify(data));
// 	});

// 	promises.push(promiseMenu);

// 	Promise.all(promises).then(function(values) {
// 		res.render('playlists/new', {
// 			title: 'Shopcast - Playlists',
// 			titleContent: 'New playlist',
// 			active: '/playlists',
// 			menu: values[0]
// 		});
// 	}, function(err) {
// 		console.log(err);
// 	});

// });

router.delete('/:id', middlewares.isLogged, function( req, res ) {

	var promises = [];

	promises.push( Rest.get( 'playlist' ) );

	Promise.all(promises).then(function(values) {
		res.render('playlists', {
			title: 'My playlists ('+values[0].body.playlists.length+')',
			titleContent: 'You can manage all of your playlists from here',
			active: 'playlists',
			menu: menu,
			playlists: values[0].body.playlists,
			isLogged: true,
			user: middlewares.getUserSession()
		});
	}, function(err) {
		console.log(err);
	});
});

router.get('/', middlewares.isLogged, function( req, res ) {

	var promises = [];

	promises.push( Rest.get( 'playlist' ) );

	Promise.all(promises).then(function(values) {
		res.render('playlists', {
			title: 'My playlists ('+values[0].body.playlists.length+')',
			titleContent: 'You can manage all of your playlists from here',
			active: 'playlists',
			menu: menu,
			username: "Guerin_f",
			playlists: values[0].body.playlists,
			isLogged: true,
			user: req.session.user
		});
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;

