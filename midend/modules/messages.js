'use strict';

var Messages = function() {
    var self = this;

    self.init = function() {
        self.values = require(process.env.NODE_PATH + '/config/messages.json');
    };

    self.get = function() {
        if (arguments.length == 0) {
            return ;
        }
        var string = self.values[arguments[0]];
        if (!string) {
            return ;
        }
        var i = 1;
        while (arguments[i]) {
            string.replace("%s", arguments[i]);
            i += 1;
        }
        return string;
    }

    self.init();
    return self;
};

module.exports = new Messages();
