'use strict';

var express = require('express'),
	router = express.Router(),
	Promise = require('promise'),
	Rest	= require('../rest'),
	menu    = require(__dirname + '/../modules/menu'),
	upload  = require('multer')({ dest: 'uploads/' }),
	middlewares = require('../middlewares'),
	humanize = require('humanize'),
	translate = require('../languages');

router.post('/',middlewares.isLogged, upload.any(), function(req, res) {

	var promises = [];

	for (var i in req.files) {
		promises.push(Rest.post('file', JSON.stringify(req.files[i])));
	}
	Promise.all(promises).then(function() {
		res.redirect('/files?message=Files correctly upload');
	}, function(err) {
		console.log(err);
		res.redirect('/files?message=Files can\'t be upload');
	});
});

router.get('/delete/:id', middlewares.isLogged, middlewares.language, function( req, res ) {

	var promises = [];
	var id = req.params.id;

	promises.push(Rest.delete('file/' + id));
	Promise.all(promises).then(function() {
		res.redirect('/files?message=File correctly deleted');
	}, function(err) {
		console.log(err);
		res.redirect('/file/'+id+'?message=File can\'t be deleted');
	});

});

router.get('/:id', middlewares.isLogged, middlewares.language, function( req, res ) {

	var promises = [];
	var id = req.params.id;

	promises.push(Rest.get('file/' + id));
	promises.push(Rest.get('playlist'));

	Promise.all(promises).then(function(values) {
		
		var file = values[0].body.file;
		file.size = humanize.filesize(file.size);

		var playlists = values[1].body.playlists;
		values[1].body.playlists.forEach(function(element,index,array){
			if ( playlists[index].tags != null )
				playlists[index].tags = element.tags.split(",");
		});

		res.render('files/show', {
			active: 'files',
			menu: menu.load(req.session.user), 
			file: file,
			playlists: playlists,
			isLogged: true,
			isSearchBar: false,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "File", { title: file.name, tabTitle: file.name } ),
			language: req.cookies.language
		});
	}, function(err) {
		console.log(err);
		res.redirect('/dashboards?message=' + err.body.message);
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

		res.render('files/list', {
			active: 'files',
			menu: menu.load(req.session.user), 
			files: files,
			isLogged: true,
			isSearchBar: true,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Files", { title: files.length } ),
			language: req.cookies.language
		});
	}, function(err) {
		console.log(err);
		res.redirect('/dashboards?message=' + err.body.message);
	});
});

module.exports = router;
