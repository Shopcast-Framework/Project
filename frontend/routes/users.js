'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('promise');
var Rest = require('../rest');
var menu    = require(__dirname + '/../menu.json');
var middlewares = require('../middlewares');
var translate = require('../languages');

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

router.post('/',middlewares.isLogged, function(req, res) {

	Rest.post('user', JSON.stringify(req.body)).then(function(response) {
		res.redirect('/users?message=' + response.body.message);
	}, function(err) {
		res.redirect('/users?message=' + err.body.message);
		console.log(err); 
	});
});

router.post('/:id', function(req, res) {
	Rest.put('user/' + req.params.id, JSON.stringify(req.body)).then(function(response) {
		res.redirect('/users?message=' + response.body.message);
	}, function(err) {
		res.redirect('/users?message=' + err.body.message);
	});
});

router.get('/:id', middlewares.isLogged, middlewares.language, function( req, res ) {

	var promises = [];

	promises.push( Rest.get( 'user/' + req.params.id ) );

	Promise.all(promises).then(function(values) {

		var user = values[0].body.user;

		if ( user.avatar == null )
			user.avatar = "public/images/users/default.png";

		res.render('user/view', {
			active: '',
			menu: menu,
			user: user,
			permission: [ "Administrateur", "Client" ],
			isLogged: true,
			isSearchBar: false,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "User", { title: user.name, tabTitle: user.name } ),
			language: req.cookies.language,
		});
	}, function(err) {
		console.log(err);
	});
});

router.get('/', middlewares.isLogged, middlewares.language, function( req, res ) {

	var promises = [];

	promises.push( Rest.get( 'user' ) );

	Promise.all(promises).then(function(values) {

		var users = values[0].body.users;
		values[0].body.users.forEach(function(element,index,array){
			if ( users[index].avatar == null )
				users[index].avatar = "public/images/users/default.png";
		});

		res.render('user/list', {
			active: '/users',
			menu: menu,
			users: users,
			permission: [ "Administrateur", "Client"],
			isLogged: true,
			isSearchBar: true,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Users", { title: users.length } ),
			language: req.cookies.language,
		});
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;
