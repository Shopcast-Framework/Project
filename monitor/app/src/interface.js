const $ = require("jquery");
const settings = require('electron-settings');
const helper = require('./helper');
const views = require("../config/views.json");
const config = require("../config/config.json");
const state = require("../config/state.json");

module.exports = {
    init: function(){
        settings.set("view", views.INIT);
    },
    run: function() {
        helper.delay(this.loop, config.refreshTimeInterface, false, this);
    },
    loop: function(handler){
        handler.setView();
        handler.displayView();
    },
    setView: function(){
        settings.get('state').then(val => {
            settings.set("view", views[val]);
        });
    },
    displayView: function(){
        settings.get('view').then(val => {
            console.log(val);
            helper.loadTemplate(val);
        });
    }
};