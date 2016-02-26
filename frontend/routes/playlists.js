'use strict';

var express = require( 'express' );
var router = express.Router();
var Promise = require( 'promise' );
var Rest = require('../rest');
var menu    = require(__dirname + '/../menu.json');

router.get('/', function( req, res ) { // Login request for the userList of files

	var promises = [];

	promises.push( Rest.get( 'playlist' ) );

	Promise.all( promises ).then( function( values ) {
		res.render('playlists', {title: 'Shopcast - Playlists', titleContent: 'My playlists (20)', active: '/playlists', menu: menu } );
	}, function(err) {
		console.log(err);
	});

});


module.exports = router;