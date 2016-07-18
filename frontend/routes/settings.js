'use strict';

var express = require('express');
var router = express.Router();
var Promise = require( 'promise' );
var menu    = require(__dirname + '/../menu.json');
var middlewares = require('../middlewares');
var translate = require('../languages');

router.get('/', middlewares.isLogged, middlewares.language, function( req, res ) {

	res.render('settings', {
		active: '/settings',
		menu: menu,
		isLogged: true,
		isSearchBar: false,
		session: req.session.user,
		translate : translate.getWordsByPage( req.cookies.language, "Settings" ),
		language: req.cookies.language,
		allTranslates: translate.getTranslate()
	});

	// var promises = [];

	// promises.push(Rest.get('playlist'));

	// Promise.all(promises).then(function(values) {
		
	// 	// Pour le futur

		
	// }, function(err) {
	// 	console.log(err);
	// });

});


module.exports = router;