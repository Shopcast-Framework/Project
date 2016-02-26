'use strict';

var express = require('express');
var router = express.Router();
var Promise = require( 'promise' );
var menu    = require(__dirname + '/../menu.json');

router.get('/', function( req, res ) { // Login request for the userList of files

	res.render( 'files', { title: 'Shopcast - Files', titleContent: 'My files (20)', active: '/files', menu: menu } );

});


module.exports = router;
