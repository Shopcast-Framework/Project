'use strict';

var menu    = require(__dirname + '/../menu.json');

module.exports = {

    load: function(user) {

    	var tmp = []

       	if (!user) {
        	return [];
	    }

	    for (var i in menu) {
	    	
	        if (user.role <= menu[i].access)
	        	tmp.push(menu[i]);
	    }

	    return tmp;

    }
    
};
