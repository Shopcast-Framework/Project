'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('promise');
var Rest = require('../rest');
var menu    = require(__dirname + '/../menu.json');

router.post('/', function(req, res) {

	console.log(req.body);

	var promises = [];

	promises.push(
		Rest.post('user', JSON.stringify(req.body))
	);

	res.render( 'users', { title: 'Shopcast - Users', titleContent: 'Users (20)', active: '/users', menu: menu } );

});

router.get('/', function( req, res ) { // Login request for the userList of files

	res.render( 'users', { title: 'Shopcast - Users', titleContent: 'Users (20)', active: '/users', menu: menu } );

});

module.exports = router;