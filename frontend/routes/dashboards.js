'use strict';

var express = require('express');
var router = express.Router();
var Promise = require('promise');
var menu    = require(__dirname + '/../modules/menu.js');

router.get('/', function(req, res) {

	res.render('dashboards', {
		title: 'Shopcast - Dashboard',
		titleContent:'Dashboard',
		active: '',
		menu: menu.load(req.session.user)
	});

});

module.exports = router;
