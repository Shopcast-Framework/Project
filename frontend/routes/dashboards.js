'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('promise');
var menu    = require(__dirname + '/../menu.json');
var middlewares = require('../middlewares');
var translate = require('../languages');

router.get('/', middlewares.isLogged, middlewares.language, function(req, res){

	// console.log('Co successful with token:');
	// console.log(req.session.user.token);
	// console.log(req.session.user);
	
	res.render('dashboards', { 
			active: '/dashboards', 
			menu: menu, 
			isLogged: true, 
			isSearchBar: false,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Dashboard" ),
			language: req.cookies.language
	});

});

module.exports = router;
