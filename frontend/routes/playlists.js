'use strict';

var express = require( 'express' );
var router = express.Router();
var Promise = require( 'promise' );
var Rest = require('../rest');
var menu    = require(__dirname + '/../modules/menu');
var middlewares = require('../middlewares');
var translate = require('../languages');
var humanize = require('humanize');

router.post('/', middlewares.isLogged, function(req, res) {

	Rest.post('playlist', JSON.stringify(req.body)).then(function(response) {
		console.log(response);
		res.redirect('/playlists?message=' + response.body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/playlists?message=' + err.body.message);
	});
});

router.post('/:id',middlewares.isLogged, function(req, res) {

    var id = req.params.id;

    Rest.put('playlist/' + id, JSON.stringify(req.body)).then(function(response) {
        res.redirect('/playlists/' + id + '?message=' + response.body.message);
    }, function(err) {
        console.log(err);
        res.redirect('/playlists/' + id + '?message=' + err.body.message);
    })
});

router.get('/delete/:id', middlewares.isLogged, function( req, res ) {

	var promises = [];
	var id = req.params.id;

	promises.push(Rest.delete('playlist/' + id));
	Promise.all(promises).then(function(response) {
		res.redirect('/playlists?message=' + response[0].body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/playlists?message=' + err.body.message);
	});

});

router.post('/:id/file/add/', middlewares.isLogged, middlewares.language, function( req, res ) {

    var id = req.params.id;
    var ids = req.body;
    console.log(ids);

    var url = 'playlist/' + id + '/add';

	Rest.post(url, JSON.stringify({files: ids.files}))
    .then(function(response) {
		console.log(response);
		res.redirect('/playlists/'+id+'?message=' + response.body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/playlists/'+id+'?message=' + err.body.message);
	});

});

router.post('/:id/file/sort/', middlewares.isLogged, middlewares.language, function( req, res ) {

    var id = req.params.id;
    var files = req.body;

    var url = 'playlist/' + id + '/sort';

	Rest.post(url, JSON.stringify(files.ids)).then(function(response) {
		res.send(response.body);
	}, function(err) {
		console.log(err);
		res.send(err.body);
	});

});

router.get('/:id/file/add/:id_file', middlewares.isLogged, middlewares.language, function( req, res ) {

    var id = req.params.id;
    var id_file = req.params.id_file;

    var url = 'playlist/' + id + '/add';

	Rest.post(url, JSON.stringify([id_file])).then(function(response) {
		console.log(response);
		res.redirect('/playlists/'+id+'?message=' + response.body.message);
	}, function(err) {
		console.log(err);
		res.redirect('/playlists/'+id+'?message=' + err.body.message);
	});

});

router.get('/:id/file/delete/:id_file', middlewares.isLogged, middlewares.language, function( req, res ) {

    var id = req.params.id;
    var id_file = req.params.id_file;

    var url = 'playlist/' + id + '/sub/' + id_file;

	Rest.delete(url, JSON.stringify({ids:[id_file]})).then(function(response) {
		console.log(response);
		res.redirect('/playlists?message=Successfully deleted');
	}, function(err) {
		console.log(err);
		res.redirect('/playlists?message=Successfully deleted');
	});

});

router.get('/', middlewares.isLogged, middlewares.language, function( req, res ) {

	var promises = [];

	promises.push(Rest.get('playlist'));
	promises.push(menu.load(req.session.user));

	Promise.all(promises).then(function(values) {

		var playlists = values[0].body.playlists;
		values[0].body.playlists.forEach(function(element,index,array){
			if ( playlists[index].tags != null )
				playlists[index].tags = element.tags.split(",");
		});

		res.render('playlists/list', {
			active: '/playlists',
			menu: values[1],
			playlists: playlists,
			isLogged: true,
			isSearchBar: true,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Playlists", { title: playlists.length } ),
			language: req.cookies.language
		});
	}, function(err) {
		console.log(err);
	});

});

router.get('/:id', middlewares.isLogged, middlewares.language, function( req, res ) {

	var promises = [];
    var id = req.params.id;

	promises.push(Rest.get('file'));
	promises.push(Rest.get('playlist/'+id));
	promises.push(menu.load(req.session.user));

	Promise.all(promises).then(function(values) {

		var files = values[0].body.files;
		var playlist = values[1].body.playlist;
		playlist.filesId = [];

		values[0].body.files.forEach(function(element,index,array){
			files[index].size = humanize.filesize(files[index].size);
		});

        values[1].body.playlist.files.forEach(function(element,index,array){
        	playlist.filesId.push(element.id);
        	playlist.files[index].size = humanize.filesize(playlist.files[index].size);
		});

		res.render('playlists/show', {
			active: '/playlists',
			menu: values[2],
			playlist: playlist,
			files: files,
			isLogged: true,
			isSearchBar: false,
			session: req.session.user,
			translate : translate.getWordsByPage( req.cookies.language, "Playlist", { title: playlist.name, tabTitle: playlist.name } ),
			language: req.cookies.language
		});
	}, function(err) {
		console.log(err);
	});

});

module.exports = router;
