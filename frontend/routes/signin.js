'use strict';

var express = require('express');
var router 	= express.Router();
var Promise = require( 'promise' );
var menu    = require(__dirname + '/../menu.json');
var translate = require('../languages');
var middlewares = require('../middlewares');
var Rest 	= require('../rest');

router.get('/', middlewares.language, function(req, res) {

	Rest.get('session/config').then(function(datas) {
		res.render('signin', { 	
			active: '',
			menu: menu,
			isSearchBar: false,
			isLogged: false,
			translate : translate.getWordsByPage( req.cookies.language, "SignIn" ),
			language: req.cookies.language,
			fbId: datas.body.config.facebook.CLIENT_APP_ID
		 } );
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;
