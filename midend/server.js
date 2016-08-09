'use strict';

var onError = function(err) {
    console.log('Server stopped because of fatal error : ' + err.toString());
};

if (!process.env.NODE_ENV) {
    throw "Error NODE_ENV undefined";
}

if (!process.env.NODE_PATH) {
    throw "Error NODE_PATH undefined";
}

var Q           = require('q'),
    express     = require('express'),
    app         = express(),
    port        = 3001;

Q.all([
    require('./modules/orm').load(),
    require('./modules/auth').load(app),
    require('./modules/api').load(app)
]).then(function() {
    app.listen(port);
    console.log('Server running on port ' + port + '....');
}, onError);

module.exports = app;
