'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('promise');
var menu    = require(__dirname + '/../menu.json');

router.get('/', function(req, res){

	console.log('Co successful with token:');
	console.log(req.session.user.token);
	
	res.render('dashboards', { title: 'Shopcast - Dashboard', titleContent:'Dashboard', active: '', menu: menu } );

});


module.exports = router;