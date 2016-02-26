'use strict';

var express = require('express');
var router = express.Router();
var Promise = require( 'promise' );
var menu    = require(__dirname + '/../menu.json');

router.get('/', function( req, res ){

	res.render('home', { title: 'Shopcast - Home', titleContent:'Home', active: '', menu: menu } );

});


module.exports = router;
