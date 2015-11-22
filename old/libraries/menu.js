var Translate = require( './translate' );

/**
 * Menu module, provide all features to manage all menus.
 * @constructor
 */

function Menu() 
{
 	this.translate = new Translate( "fr" );
}

/**
 * This function get the menu from the type.
 * @param {string} type - Kind of menu.
 */

Menu.prototype.getMenu = function( type ) {

	var menu = [];

	menu.push( { title: this.translate.word( "Dashboard" ), url: "/", logo: "/images/system/menu-home.png" } );
	menu.push( { title: this.translate.word( "Upload" ), url: "/upload", logo: "/images/system/menu-upload.png" } );
	menu.push( { title: this.translate.word( "File(s)" ), url: "/files", logo: "/images/system/menu-file.png" } );
	menu.push( { title: this.translate.word( "Playlist(s)" ), url: "/playlists", logo: "/images/system/menu-playlist.png" } );
	menu.push( { title: this.translate.word( "User(s)" ), url: "/users", logo: "/images/system/menu-user.png" } );
	menu.push( { title: this.translate.word( "Display mode(s)" ), url: "/display-modes", logo: "/images/system/menu-mode.png" } );
	menu.push( { title: this.translate.word( "Configuration" ), url: "/settings", logo: "/images/system/menu-configuration.png" } );

	return menu;
};

/**
 * Menu module
 * @module Menu
 */

module.exports = Menu;