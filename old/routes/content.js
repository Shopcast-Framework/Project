
var Menu = require( '../libraries/menu' );
var Translate = require( '../libraries/translate' );


/**
 * Menu module, provide all features to manage all menus.
 * @constructor
 */

exports.upload = function( req, res ){

	menu = new Menu();
	translate = new Translate( "fr" );
	res.render('content/upload', { 
		title: 'Eip',
		page : translate.word( "Upload" ),
		menu: menu.getMenu( "main" )
	});

};

exports.files = function( req, res ){

	menu = new Menu();
	translate = new Translate( "fr" );
	res.render('content/files', { 
		title: 'Eip',
		page : translate.word( "File(s)" ),
		menu: menu.getMenu( "main" )
	});

};

exports.playlists = function( req, res ){

	menu = new Menu();
	translate = new Translate( "fr" );
	res.render('content/playlists', { 
		title: 'Eip',
		page : translate.word( "Playlist(s)" ),
		menu: menu.getMenu( "main" )
	});

};