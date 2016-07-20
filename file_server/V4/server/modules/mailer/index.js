'use strict';

var nodemailer = require('nodemailer'),
    config      = require(process.env.NODE_PATH + '/config/mailer.json')[process.env.NODE_ENV];

var Mailer = function() {
    var self = this;

    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: config.auth
    };

    self.init = function() {
        console.log("INIT");
        self.Template = require(process.env.NODE_PATH + '/modules/mailer/template.js');
        self.transport = nodemailer.createTransport(smtpConfig, {
            debug: true
        });
    };

    self.send = function(dest, mail) {

        if (process.env.NODE_ENV == "development") {
            console.log(mail);
            return ;
        }

        self.transport.sendMail({
            from: "Shopcast ✔>",
            to: dest,
            subject: "Update of your password",
            html: mail
        });

    };

    self.init();
    return self;
};

module.exports = new Mailer();
