var express = require('express');
var router = express.Router();
var Promise = require( 'promise' );

// Sequalize variable
var models  = require('../sequelize/models');
var MenuModel = models.menu;

router.get('/', function( req, res ) { // Login request for the userList of files

	var promises = [];
	var menu = null;

	var promiseMenu = MenuModel.findAll( { where: { isActive: true } } ).then( function( data ) {
		var menu = JSON.parse( JSON.stringify( data ) );
		return menu;
	});

	promises.push( promiseMenu );

	Promise.all( promises ).then( function( values ){
		res.render( 'settings', { title: 'Shopcast - Settings', titleContent: 'My files (20)', active: '/settings', menu: values[ 0 ] } );
	}) ;

});


module.exports = router;