
var Menu = require( '../libraries/menu' );
var Translate = require( '../libraries/translate' );

/**
 * Menu module, provide all features to manage all menus.
 * @constructor
 */

exports.index = function( req, res ){

	menu = new Menu();
	translate = new Translate( "fr" );
	res.render('dashboard/index', { 
		title: translate.word( "Dashboard" ),
		page : translate.word( "Dashboard" ),
		menu: menu.getMenu( "main" )
	});

};