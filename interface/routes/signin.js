'use strict';

var express = require('express');
var router = express.Router();
var Promise = require( 'promise' );

// Sequalize variable
var models  = require('../sequelize/models');
var MenuModel = models.menu;

router.get('/', function( req, res ) {

	var promises = [];

    promises.push(
        MenuModel.findAll( { where: { isActive: true } } ).then( function( data ) {
            return JSON.parse( JSON.stringify( data ) );
        })
    );

	Promise.all( promises ).then( function( values ){
        res.render('signin', { title: 'Shopcast - Sign in', titleContent:'Sign in', active: '', menu: values[ 0 ] } );
	}) ;
});


module.exports = router;
