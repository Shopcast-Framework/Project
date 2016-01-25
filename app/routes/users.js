'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('promise');
var Rest = require('../rest');

// Sequalize variable
var models  = require( '../sequelize/models' );
var MenuModel = models.menu;

router.post('/', function(req, res) {

	console.log(req.body);

	var promises = [];

	promises.push(
		MenuModel.findAll( { where: { isActive: true } } ).then( function( data ) {
			return JSON.parse( JSON.stringify( data ) );
		})
	);

	promises.push(
		Rest.post('user', JSON.stringify(req.body))
	);

	Promise.all( promises ).then(function( values ) {
		res.render( 'users', { title: 'Shopcast - Users', titleContent: 'Users (20)', active: '/users', menu: values[ 0 ] } );
	});

});

router.get('/', function( req, res ) { // Login request for the userList of files

	var promises = [];

	var promiseMenu = MenuModel.findAll( { where: { isActive: true } } ).then( function( data ) {
		var menu = JSON.parse( JSON.stringify( data ) );
		return menu;
	});

	promises.push( promiseMenu );

	Promise.all( promises ).then( function( values ){
		res.render( 'users', { title: 'Shopcast - Users', titleContent: 'Users (20)', active: '/users', menu: values[ 0 ] } );
	}) ;

});

module.exports = router;
