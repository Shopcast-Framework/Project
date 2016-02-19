var express = require( 'express' );
var router = express.Router();
var Promise = require( 'promise' );
var Rest = require('../rest');

// Sequalize variable
var models  = require( '../sequelize/models' );
var MenuModel = models.menu;

router.get('/', function( req, res ) { // Login request for the userList of files

	var promises = [];
	var menu = null;

	var promiseMenu = MenuModel.findAll( { where: { isActive: true } } ).then( function( data ) {
		var menu = JSON.parse( JSON.stringify( data ) );
		return menu;
	});

	promises.push( promiseMenu );

	promises.push(Rest.get('playlist'));

	Promise.all(promises).then(function(values) {
		res.render('playlists', {title: 'Shopcast - Playlists', titleContent: 'My playlists (20)', active: '/playlists', menu: values[0]});
	}, function(err) {
		console.log(err);
	});

});


module.exports = router;