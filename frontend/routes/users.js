'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('promise');
var Rest = require('../rest');
var menu    = require(__dirname + '/../menu.json');
var middlewares = require('../middlewares');

router.post('/', function(req, res) {

	console.log(req.body);

	var promises = [];

	promises.push(
		Rest.post('user', JSON.stringify(req.body))
	);

	res.render( 'users', { title: 'Shopcast - Users', titleContent: 'Users (20)', active: '/users', menu: menu } );

});

router.get('/', middlewares.isLogged, function( req, res ) {

	var promises = [];

	promises.push( Rest.get( 'user' ) );

	Promise.all(promises).then(function(values) {
		res.render('users', {
			title: 'Users ('+values[0].body.users.length+')',
			titleContent: 'You can manage all users from here',
			active: 'users',
			menu: menu,
			users: values[0].body.users,
			isLogged: true
		});
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;