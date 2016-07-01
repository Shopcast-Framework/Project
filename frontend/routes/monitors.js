'use strict';

var express	= require('express'),
	router	= express.Router(),
	Promise	= require('promise'),
	Rest	= require('../rest'),
	menu	= require(__dirname + '/../modules/menu.js'),
	upload  = require('multer')({ dest: 'public/uploads/' });

router.post('/', function(req, res) {
    Rest.post('monitor', JSON.stringify(req.body)).then(function(response) {
        res.redirect('/monitors/new');
    }, function(err) {
        res.redirect('/monitors/new');
    });
})

router.get('/new', function(req, res) {
    res.render('monitors/new', {
		title: 'Shopcast - Playlists',
		titleContent: 'New monitor',
		active: '/monitors',
		menu: menu.load(req.session.user)
	});
});

module.exports = router;
