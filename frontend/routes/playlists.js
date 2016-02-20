var express = require( 'express' );
var router = express.Router();
var Promise = require( 'promise' );
var Rest = require('../rest');

// Sequalize variable
var models  = require( '../sequelize/models' );
var MenuModel = models.menu;

router.post('/', function(req, res) {

	Rest.post('playlist', JSON.stringify(req.body)).then(function(response) {
		console.log(response);
		res.redirect('/playlists?message=' + response.message);
	}, function(err) {
		console.log(err);
		res.redirect('/playlists?message=' + err.message);
	});
});

router.get('/new', function(req, res) {

	var promises = [];
	var menu = null;

	var promiseMenu = MenuModel.findAll({ where: { isActive: true }}).then(function(data) {
		return JSON.parse(JSON.stringify(data));
	});

	promises.push(promiseMenu);

	Promise.all(promises).then(function(values) {
		res.render('playlists/new', {
			title: 'Shopcast - Playlists',
			titleContent: 'New playlist',
			active: '/playlists',
			menu: values[0]
		});
	}, function(err) {
		console.log(err);
	});

});

router.get('/', function( req, res ) {

	var promises = [];
	var menu = null;

	var promiseMenu = MenuModel.findAll( { where: { isActive: true } } ).then( function( data ) {
		var menu = JSON.parse( JSON.stringify( data ) );
		return menu;
	});

	promises.push( promiseMenu );

	promises.push(Rest.get('playlist'));

	Promise.all(promises).then(function(values) {
		res.render('playlists/index', {
			title: 'Shopcast - Playlists',
			titleContent: 'My playlists (20)',
			active: '/playlists',
			menu: values[0],
			playlists: values[1].body.playlists
		});
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;
