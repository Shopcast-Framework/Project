
var Menu = require( '../libraries/menu' );
var Translate = require( '../libraries/translate' );


/**
 * Menu module, provide all features to manage all menus.
 * @constructor
 */

exports.list = function( req, res ){

	menu = new Menu();
	translate = new Translate( "fr" );
	res.render('config/list', { 
		title: 'Eip',
		page : translate.word( "Configuration" ),
		menu: menu.getMenu( "main" )
	});

};