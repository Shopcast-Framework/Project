'use strict';

var menu    = require(__dirname + '/../menu.json')

function MenuLoader(user) {

    if (!user) {
        return [];
    }
    for (var i in menu) {
        menu[i].url = menu[i].url.replace(':user_id', user.id);
    }

    return menu;
}

exports.load = MenuLoader;
