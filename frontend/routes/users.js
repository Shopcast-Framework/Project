'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('promise');
var Rest = require('../rest');
var menu    = require(__dirname + '/../menu.json');
var middlewares = require('../middlewares');
var translate = require('../languages');

router.post('/',middlewares.isLogged, function(req, res) {

	Rest.post('user', JSON.stringify(req.body)).then(function(response) {
		res.redirect('/users?message=' + response.body.message);
	}, function(err) {
		console.log(err); 
		res.redirect('/users?message=' + err.message);
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
			title: 'Users ('+users.length+')',
			titleContent: 'You can manage all users from here',
			active: 'users',
			menu: menu,
			users: users,
			permission: [ "Administrateur", "Client"],
			isLogged: true,
			isSearchBar: true,
			user: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Users", { title: users.length } ),
			language: req.cookies.language,
		});
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;