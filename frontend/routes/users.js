'use strict';

var express = require('express'),
	router 	= express.Router(),
	Promise = require('promise'),
	Rest 	= require('../rest'),
	menu    = require(__dirname + '/../menu.json');

router.post('/', function(req, res) {
	var promises = [];

	Rest.post('user', JSON.stringify(req.body)).then(function(values) {
		res.redirect('/users?message=' + response.body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/users?message=' + err.body.message);
	});
});

router.post('/:id', function(req, res) {
	Rest.put('user/' + req.params.id, JSON.stringify(req.body)).then(function(response) {
		console.log(response);
		res.redirect('/users?message=' + response.body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/users?message=' + err.body.message);
	});
});

router.get('/:id', function(req, res) {
	var promises = [];

	promises.push(Rest.get('user/' + req.params.id));

	Promise.all(promises).then(function(values) {
		var user = values[0].body.user;

		console.log(user);

		res.render('users/show', {
			title: 'Shopcast - Users',
			titleContent: 'Show user',
			active: '/users',
			user: user,
			menu: menu
		});
	}, function(err) {
		console.log(err);
	});
});

router.get('/', function(req, res) {
	res.render('users/index', {
		title: 'Shopcast - Users',
		titleContent: 'Users (20)',
		active: '/users',
		menu: menu
	});
});

module.exports = router;
