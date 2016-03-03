'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('promise');
var menu    = require(__dirname + '/../menu.json');
var middlewares = require('../middlewares');

router.get('/', middlewares.isLogged, function(req, res){

	// console.log('Co successful with token:');
	// console.log(req.session.user.token);
	// console.log(req.session.user);
	
	res.render('dashboards', { title: 'Shopcast - Dashboard', titleContent:'Dashboard', active: '', menu: menu, isLogged: true, user: req.session.user } );

});


module.exports = router;