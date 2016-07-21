'use strict';

module.exports = {

    load: function(user) {

    	console.log(user);
    	var menu    = require(__dirname + '/../menu.json');
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
