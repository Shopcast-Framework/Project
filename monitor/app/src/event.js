const $ = require("jquery");
const Promise = require("bluebird");
const settings = require('electron-settings');
const core = require("./tools");
const player = require("./player");
const menu = require("./menu");
const state = require("../config/views.json");
var mouse = {x: 0, y: 0};

// Load all init features
core.init();

// Check if the monitor is registered
registered();

// Check if the mouse is on move
$( "#target" ).mousemove(function( event ) {
    if (mouse.x == event.pageX && mouse.y == event.pageY) {
        menu.hide();
    }
    else{
        mouse.x = event.pageX;
        mouse.y = event.pageY;
        menu.show();
    }
});

function registered(){
    var promise2 = new Promise(function(resolve, reject) {

        // By default check if the id is registered in the API
        return core.checkIfTheMonitorIsRegistered(resolve);
    });

    promise2.then(function(result){
        if (result.success){
            core.loadTemplate("registered.html");
            core.delay(player.init, 3000);
        }
        else{
            console.log("Not logged");
            var promise = new Promise(function(resolve, reject) {

                return core.loadTemplate("unregistered.html", 0, resolve);
            });
            promise.then(function(result){
                core.checkId();
            });
        }
    });
}
