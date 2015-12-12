var path = require( 'path' );
var Promise = require( 'promise' );

// Sequalize variable
var models  = require( '../sequelize/models' );
var MenuModel = models.menu;

exports.index = function( req, res ){

	var promises = [];
	var menu = null;

	var promiseMenu = MenuModel.findAll( { where: { isActive: true } } ).then( function( data ) {
		var menu = JSON.parse( JSON.stringify( data ) );
		return menu;
	});

	promises.push( promiseMenu );

	Promise.all( promises ).then( function( values ){
		res.render('index', { title: 'Shopcast - Dashboard', titleContent:'Dashboard', active: '', menu: values[ 0 ] } );
	}) ;
};

exports.files = require( './files' );
exports.playlists = require( './playlists' );
exports.users = require( './users' );
exports.display = require( './display' );
exports.settings = require( './settings' );
//exports.login = require('./login');
