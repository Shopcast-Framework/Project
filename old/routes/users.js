
var Menu = require( '../libraries/menu' );
var Translate = require( '../libraries/translate' );


/**
 * Menu module, provide all features to manage all menus.
 * @constructor
 */

exports.list = function( req, res ){

	menu = new Menu();
	translate = new Translate( "fr" );
	res.render('users/list', { 
		title: 'Eip',
		page : translate.word( "User(s)" ),
		menu: menu.getMenu( "main" )
	});

};