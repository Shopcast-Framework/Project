'use strict';

var express = require('express'),
	router = express.Router(),
	Promise = require('promise'),
	Rest	= require('../rest'),
	menu    = require(__dirname + '/../menu.json'),
	upload  = require('multer')({ dest: 'uploads/' }),
	middlewares = require('../middlewares'),
	humanize = require('humanize'),
	translate = require('../languages');

router.post('/',middlewares.isLogged, upload.any(), function(req, res) {

	if (req.files && req.files[0]) {
		var file = req.files[0];
		for (var k in file) { req.body[k] = file[k]; }
	}

	Rest.post('file', JSON.stringify(req.body)).then(function() {
		res.redirect('/files?message=Files correctly upload');
	}, function(err) {
		console.log(err);
		res.redirect('/files?message=Files can\'t be upload');
	});
});

router.get('/', middlewares.isLogged, middlewares.language, function( req, res ) {

	var promises = [];

	promises.push(Rest.get('file'));

	Promise.all(promises).then(function(values) {

		var files = values[0].body.files;
		values[0].body.files.forEach(function(element,index,array){
			if ( files[index].tags != null )
				files[index].tags = element.tags.split(",");

			files[index].size = humanize.filesize(files[index].size);
		});

		res.render('files', {
			active: '/files',
			menu: menu,
			files: files,
			isLogged: true,
			isSearchBar: true,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Files", { title: files.length } ),
			language: req.cookies.language
		});
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;
