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
    		console.log("hello");
    		for( var val in values ) {
    			languages[ language ][ page ][ val ] = languages[ language ][ page ][ val ].replace( "%", values[ val ] );
    			console.log("helloss");
    		}
    		console.log("hellozz");
    	}
    	languages[ language ][ page ].listing = self.listing();
        return languages[ language ][ page ];
    };

    return this;
};

module.exports = new Language();
