const $ = require("jquery");
const shortid = require('shortid');
const settings = require('electron-settings');
const _setInterval = require('setinterval-plus');
const Promise = require("bluebird");
const request = require('request');
const state = require("../config/views.json");
var uid;

module.exports = {
    init: function(){
        this.loadTemplate("home.html", 0);
        this.checkId();
    },
    checkId: function() {
        // Check if an id is already set
        settings.get('appId').then(val => {
            uid = val;
            if (uid == undefined || uid == "" || uid == null){
                uid = shortid.generate();
                settings.set('appId', uid);
            }
            $("#home-wrapper .uuid").html(uid);
        });
    },
    checkIfTheMonitorIsRegistered: function(resolve){
        var timer = new _setInterval(function () {
            // Request API
            var options = {
                url: 'http://localhost:3001/api/monitor/associate',
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
                    settings.set('state', state.registered);
                    resolve({success:true, user: body.user});
                }
                else{
                    if (body.message != undefined)
                        resolve({success:false, message: body.message});
                    else
                        resolve({success:false, message: "Error unknown"});
                }
            });
        }, 2000);
    },
    loadTemplate: function(template, time, resolve){
        var timer = new _setInterval(function () {
            timer.stop();
            $("#app").load("../views/" + template);
            resolve({success: true});
        }, time);
    }
    ,
    delay: function(callback, time){
        var timer = new _setInterval(function(){
            callback();
            timer.stop();
        }, time);
    }
};