'use strict';

var express	= require('express'),
	router	= express.Router(),
	Promise	= require('promise'),
	Rest	= require('../rest'),
	menu    = require(__dirname + '/../modules/menu'),
	middlewares = require('../middlewares'),
	translate = require('../languages');

router.post('/', middlewares.isLogged, middlewares.language, function(req, res) {

    Rest.post('monitor', JSON.stringify(req.body)).then(function(response) {
        res.redirect('/monitors?message='+response.body.message);
    }, function(err) {
        res.redirect('/monitors?message='+err.body.message);
    });

});

router.get('/delete/:id', middlewares.isLogged, function( req, res ) {

	var promises = [];
	var id = req.params.id;

	promises.push(Rest.delete('monitor/' + id));
	Promise.all(promises).then(function(response) {
		res.redirect('/monitors?message=' + response[0].body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/monitors?message=' + err.body.message);
	});

});

router.get('/display/:id', middlewares.isLogged, middlewares.language, function( req, res ) {

	var promises = [];
	var id = req.params.id;

	promises.push(Rest.get( 'file/' + req.params.id ) );
	promises.push(menu.load(req.session.user));

	Promise.all(promises).then(function(values) {

		var file = values[0].body.file;
		if (file.mimetype.indexOf("video") != -1)
			file.type = "video";
		else if (file.mimetype.indexOf("image") != -1)
			file.type = "image";
		else
			file.type = "other";

		res.render('monitors/display', {
			active: '/monitors',
			menu: values[1],
			file: file,
			isLogged: true,
			isSearchBar: false,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Monitor", { title: file.name, tabTitle: file.name } ),
			language: req.cookies.language,
		});
	}, function(err) {
		console.log(err);
	});

router.post('/:id',middlewares.isLogged, function(req, res) {

	var id = req.params.id;

	Rest.put('monitor/' + id, JSON.stringify(req.body)).then(function(response) {
		res.redirect('/monitors/' + id + '?message=' + response.body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/monitors/' + id + '?message=' + response.body.message);
	})

});

router.get('/:id', middlewares.isLogged, middlewares.language, function( req, res ) {

	var promises = [];

	promises.push(Rest.get( 'monitor/' + req.params.id ) );
	promises.push(menu.load(req.session.user));

	Promise.all(promises).then(function(values) {

		var monitor = values[0].body.monitor;

		res.render('monitors/show', {
			active: 'monitors',
			menu: values[1],
			monitor: monitor,
			isLogged: true,
			isSearchBar: false,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Monitor", { title: monitor.name, tabTitle: monitor.name } ),
			language: req.cookies.language,
		});
	}, function(err) {
		console.log(err);
	});
});

router.get('/', middlewares.isLogged, middlewares.language, function( req, res ) {

	var promises = [];

	promises.push( Rest.get( 'monitor' ) );
	promises.push(menu.load(req.session.user));

	Promise.all(promises).then(function(values) {

		var monitors = values[0].body.monitors;

		res.render('monitors/list', {
			active: '/monitors',
			menu: values[1],
			monitors: monitors,
			isLogged: true,
			isSearchBar: true,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Monitors", { title: monitors.length } ),
			language: req.cookies.language,
		});
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;
