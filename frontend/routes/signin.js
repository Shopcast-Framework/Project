'use strict';

var express = require('express');
var router = express.Router();
var Promise = require( 'promise' );
var menu    = require(__dirname + '/../menu.json')


router.get('/', function( req, res ) {

	res.render('signin', { 	title: 'Sign in', 
							titleTab: 'Shopcast - sign in', 
							titleContent:'You can sign in with your e-mail, facebook or google account.', 
							active: '', 
							menu: menu,
							isLogged: false
						 } );

});


module.exports = router;