'use strict';

var nodemailer  = require('nodemailer'),
    fs          = require('fs'),
    config      = require(process.env.NODE_PATH + '/config/mailer.json')[process.env.NODE_ENV];

var Template = function() {
    var self = this;

    self.init = function() {
        self.variables = ["username", "link"]
    };

    self.username = function() {
        self.mail = self.mail.replace(/:username/g, self.user.username);
    };

    self.link = function() {
        var url = config.reset_url + "?token=" + self.user.reset_token;
        self.mail = self.mail.replace(/:link/g, url);
    };

    self.create = function(user) {
        self.user = user;
        self.mail = fs.readFileSync(process.env.NODE_PATH + '/modules/mailer/mail.html').toString();
        for (var i = 0; i < self.variables.length; ++i) {
            var variable = self.variables[i];
            self[variable]();
        }
        return self.mail;
    };

    self.init();
    return self;
};

module.exports = new Template()
