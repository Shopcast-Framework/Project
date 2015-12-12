var app = require('./app.js');
var models = require("./sequelize/models");

models.sequelize.sync().then(function () {

 	var server = app.run();
 	
});
