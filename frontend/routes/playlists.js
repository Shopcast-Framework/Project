'use strict';

var express = require( 'express' );
var router = express.Router();
var Promise = require( 'promise' );
var Rest = require('../rest');
var menu    = require(__dirname + '/../menu.json');

router.post('/', function(req, res) {

	Rest.post('playlist', JSON.stringify(req.body)).then(function(response) {
		console.log(response);
		res.redirect('/playlists?message=' + response.message);
	}, function(err) {
		console.log(err);
		res.redirect('/playlists?message=' + err.message);
	});
});

router.get('/new', function(req, res) {

	var promises = [];
	var menu = null;

	var promiseMenu = MenuModel.findAll({ where: { isActive: true }}).then(function(data) {
		return JSON.parse(JSON.stringify(data));
	});

	promises.push(promiseMenu);

	Promise.all(promises).then(function(values) {
		res.render('playlists/new', {
			title: 'Shopcast - Playlists',
			titleContent: 'New playlist',
			active: '/playlists',
			menu: values[0]
		});
	}, function(err) {
		console.log(err);
	});

});

router.get('/', function( req, res ) {

	var promises = [];

	promises.push( Rest.get( 'playlist' ) );

<<<<<<< HEAD
	Promise.all(promises).then(function(values) {
		res.render('playlists/index', {
			title: 'Shopcast - Playlists',
			titleContent: 'My playlists (20)',
			active: '/playlists',
			menu: values[0],
			playlists: values[1].body.playlists
		});
=======
	Promise.all( promises ).then( function( values ) {
		res.render('playlists', {title: 'Shopcast - Playlists', titleContent: 'My playlists (20)', active: '/playlists', menu: menu } );
>>>>>>> guerin_f
	}, function(err) {
		console.log(err);
	});
});

<<<<<<< HEAD
module.exports = router;
=======

module.exports = router;
>>>>>>> guerin_f
