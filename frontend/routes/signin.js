'use strict';

var express = require('express');
var router 	= express.Router();
var Promise = require( 'promise' );
var menu    = require(__dirname + '/../modules/menu.js');
var Rest 	= require('../rest');

router.get('/', function(req, res) {

	Rest.get('session/config').then(function(datas) {
		res.render('signin', {
			title: 'Sign in',
			titleTab: 'Shopcast - sign in',
			titleContent: 'You can sign in with your e-mail, facebook or google account.',
			active: '',
			fbId: datas.body.config.facebook.CLIENT_APP_ID,
			menu: menu.load(req.session.user)
		});
	}, function(err) {
		console.log(err);
	});

});


module.exports = router;
