var languages = {
	fr : require( __dirname + "/fr.json" ),
	en : require( __dirname + "/en.json" )
};


var Language = function() {
    'use strict';

    var self = this;

    self.listing = function(){
    	var listing = {
    		"fr" : "public/images/countries/fr.png",
    		"en" : "public/images/countries/en.png",
    	};
    	return listing;
    }

    self.getWordsByPage = function ( language, page, values ) {
    	if ( values !== null && values !== undefined )
    	{
    		for( var val in values ) {
    			languages[ language ][ page ][ val ] = languages[ language ][ page ][ val ].replace( "%", values[ val ] );
    		}
    	}

    	// Add languages listing
    	languages[ language ][ page ].listing = self.listing();
    	languages[ language ][ page ].Language = languages[ language ][ "Language" ];

    	// Add menu
    	languages[ language ][ page ].Menu = languages[ language ][ "Menu" ];

        return languages[ language ][ page ];
    };

    self.getTranslate = function(){
    	return languages;
    }

    return this;
};

module.exports = new Language();
