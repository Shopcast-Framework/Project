'use strict';

var express = require( 'express' );
var router = express.Router();
var Promise = require( 'promise' );
var Rest = require('../rest');
var menu    = require(__dirname + '/../menu.json');
var middlewares = require('../middlewares');
var translate = require('../languages');

router.post('/',middlewares.isLogged, function(req, res) {

	Rest.post('playlist', JSON.stringify(req.body)).then(function(response) {
		console.log(response);
		res.redirect('/playlists?message=' + response.body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/playlists?message=' + err.body.message);
	});
});

router.get('/', middlewares.isLogged, middlewares.language, function( req, res ) {

	var promises = [];

	promises.push(Rest.get('playlist'));

	Promise.all(promises).then(function(values) {
		
		var playlists = values[0].body.playlists;
		values[0].body.playlists.forEach(function(element,index,array){
			if ( playlists[index].tags != null )
				playlists[index].tags = element.tags.split(",");
		});

		res.render('playlists', {
			active: '/playlists',
			menu: menu,
			playlists: playlists,
			isLogged: true,
			isSearchBar: true,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Playlists", { title: playlists.length } ),
			language: req.cookies.language
		});
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;
