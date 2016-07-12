'use strict';

var express = require('express'),
	router 	= express.Router(),
	Promise = require('promise'),
	Rest 	= require('../rest'),
	menu    = require(__dirname + '/../modules/menu.js')

router.get('/new_password', function(req, res) {

	res.render('users/new_password', {
		title: 'Shopcast - Users',
		titleContent: 'New Password',
		active: '/users',
		menu: menu.load(req.session.user),
		query: req.query
	});
});

router.post('/new_password', function(req, res) {

	Rest.post('user/reset_password', JSON.stringify(req.body)).then(function(response) {
		res.redirect('/signin?message=' + response.body.message);
	}, function(err) {
		res.redirect('/signin?message=' + err.body.message);
	});

});

router.get('/reset_password', function(req, res) {

	res.render('users/reset_password', {
		title: 'Shopcast - Users',
		titleContent: 'Reset Password',
		active: '/users',
		menu: menu.load(req.session.user)
	});
});

router.post('/reset_password', function(req, res) {

	Rest.put('user/reset_password', JSON.stringify(req.body)).then(function(response) {
		res.redirect('/signin?message=' + response.body.message);
	}, function(err) {
		res.redirect('/signin?message=' + err.body.message);
	});
});

router.post('/', function(req, res) {
	var promises = [];

	Rest.post('user', JSON.stringify(req.body)).then(function(values) {
		res.redirect('/users?message=' + response.body.message);
	}, function(err) {
		res.redirect('/users?message=' + err.body.message);
	});
});

router.post('/:id', function(req, res) {
	Rest.put('user/' + req.params.id, JSON.stringify(req.body)).then(function(response) {
		res.redirect('/users?message=' + response.body.message);
	}, function(err) {
		res.redirect('/users?message=' + err.body.message);
	});
});

router.get('/:id/delete', function(req, res) {
	Rest.delete('user/' + req.params.id).then(function() {
		res.redirect('/signin');
	});
});

router.get('/:id', function(req, res) {
	var promises = [];

	promises.push(Rest.get('user/' + req.params.id));

	Promise.all(promises).then(function(values) {
		var user = values[0].body.user;

		res.render('users/show', {
			title: 'Shopcast - Users',
			titleContent: 'Show user',
			active: '/users',
			user: user,
			menu: menu.load(req.session.user)
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
		menu: menu.load(req.session.user)
	});
});

module.exports = router;
