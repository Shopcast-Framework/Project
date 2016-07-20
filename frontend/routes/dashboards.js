'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('promise');
/*var menu    = require(__dirname + '/../menu.json');*/
var menu    = require(__dirname + '/../modules/menu');
var middlewares = require('../middlewares');
var translate = require('../languages');

router.get('/', middlewares.isLogged, middlewares.language, function(req, res){

	var promises = [];
	// console.log(req.session.user.token);
	// console.log(req.session.user);
	promises.push(menu.load(req.session.user));
	
	Promise.all(promises).then(function(values) {

		res.render('dashboards', { 
			active: '/dashboards', 
			menu: values[0], 
			isLogged: true, 
			isSearchBar: false,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Dashboard" ),
			language: req.cookies.language
	});

	}, function(err) {
		console.log(err);
	});

});

module.exports = router;
