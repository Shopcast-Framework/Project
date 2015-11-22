
var Menu = require( '../libraries/menu' );
var Translate = require( '../libraries/translate' );


/**
 * Menu module, provide all features to manage all menus.
 * @constructor
 */

exports.list = function( req, res ){

	menu = new Menu();
	translate = new Translate( "fr" );
	res.render('displayMode/list', { 
		title: 'Eip',
		page : translate.word( "Display mode(s)" ),
		menu: menu.getMenu( "main" )
	});

};