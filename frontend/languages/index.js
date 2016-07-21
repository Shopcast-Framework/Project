var languages = {
	fr : require( __dirname + "/fr.json" ),
	en : require( __dirname + "/en.json" )
};


var Language = function() {
    'use strict';

    var self = this;

    self.listing = function(){
    	var listing = {
    		"fr" : "/public/images/countries/fr.png",
    		"en" : "/public/images/countries/en.png",
    	};
    	return listing;
    }

    self.getWordsByPage = function ( language, page, values ) {
        var copy = JSON.parse(JSON.stringify(languages));

        if ( copy[ language ][ page ] === undefined )
            return null;

        var tmp = copy[ language ][ page ];

    	if ( values !== null && values !== undefined )
    	{
    		for( var val in values ) {
    			tmp[ val ] = tmp[ val ].replace( "%", values[ val ] );
    		}
    	}

    	// Add languages listing
    	tmp.listing = self.listing();
    	tmp.Language = languages[ language ][ "Language" ];

    	// Add menu
    	tmp.Menu = languages[ language ][ "Menu" ];

        return tmp;
    };

    self.getTranslate = function(){
    	return languages;
    }

    return this;
};

module.exports = new Language();
