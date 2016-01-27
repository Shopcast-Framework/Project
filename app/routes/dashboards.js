'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('promise');

// Sequalize variable
var models  = require('../sequelize/models');
var MenuModel = models.menu;

router.get('/', function(req, res){

	console.log('Co successful with token:');
	console.log(req.session.user.token);
	var promises = [];

	var promiseMenu = MenuModel.findAll( { where: { isActive: true } } ).then( function( data ) {
		var menu = JSON.parse( JSON.stringify( data ) );
		return menu;
	});

	promises.push( promiseMenu );

	Promise.all( promises ).then( function( values ){
        res.render('dashboards', { title: 'Shopcast - Dashboard', titleContent:'Dashboard', active: '', menu: values[ 0 ] } );
	}) ;
});


module.exports = router;
