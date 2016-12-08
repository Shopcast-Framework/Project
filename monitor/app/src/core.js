const shortid = require('shortid');
const settings = require('electron-settings');
const request = require('request');
const isOnline = require('is-online');
const helper = require('./helper');
const config = require("../config/config.json");
const state = require("../config/state.json");
const apiConfig = require("../config/api.json");
var uid;

module.exports = {
    init: function(){
        this.checkUid();
    },
    checkUid: function() {
        // Check if an id is already set
        settings.get('appId').then(val => {
            uid = val;
            if (uid == undefined || uid == "" || uid == null){
                uid = shortid.generate();
                settings.set('appId', uid);
            }
        });
    },
    run: function() {
        helper.delay(this.loop, config.refreshTimeCore, false, this);
    },
    loop: function(handler){
        // Test UID
        handler.checkUid();
        // Test connection;
        handler.testInternet();
        // Test if the monitor is registered;
        handler.isMonitorRegistered();
    },
    isMonitorRegistered: function(){
        settings.get('state').then(val => {
            if (val != state.NOINTERNET){
                var options = {
                    url: apiConfig.host + apiConfig.monitorAssociate,
                    method: "POST",
                    json:{
                        uid: uid
                    },
                    headers: {
                        'Content-type': 'application/json'
                    }
                };

                request(options, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        settings.set('user', body.user);
                        settings.set('state', state.REGISTERED);
                    }
                    else{
                        if (body.message != undefined){
                            settings.set('state', state.UNREGISTERED);
                        }
                    }
                });
            }
        });
    },
    testInternet: function(){
        isOnline(function(err, online) {
            if (!online){
                settings.set('state', state.NOINTERNET);
            }
        });
    }
};