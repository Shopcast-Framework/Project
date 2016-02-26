'use strict';

var express = require( 'express' );
var router = express.Router();
var Promise = require( 'promise' );
var menu    = require(__dirname + '/../menu.json');

router.get('/', function( req, res ) { // Login request for the userList of files

	res.render( 'display', { title: 'Shopcast - Display', titleContent: 'Display mode', active: '/display', menu: values[ 0 ] } );

});


module.exports = router;