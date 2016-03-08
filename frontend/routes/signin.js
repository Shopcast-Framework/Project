'use strict';

var express = require('express');
var router = express.Router();
var Promise = require( 'promise' );
var menu    = require(__dirname + '/../menu.json');
var translate = require('../languages');
var middlewares = require('../middlewares');

router.get('/', middlewares.language, function(req, res) {

	res.render('signin', { 	
		active: '', 
		menu: menu,
		isSearchBar: false,
		isLogged: false,
		translate : translate.getWordsByPage( req.cookies.language, "SignIn" ),
		language: req.cookies.language
	 } );

});


module.exports = router;
