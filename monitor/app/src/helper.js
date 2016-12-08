const _setInterval = require('setinterval-plus');

module.exports = {
    loadTemplate: function(template){
        $("#app").load("../views/" + template);
    },
    delay: function(callback, time, timeOut, handler){
        var timer = new _setInterval(function(){
            callback(handler);
            if (timeOut)
                timer.stop();
        }, time);
    }
};
