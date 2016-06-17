'use strict';

if (!process.env.NODE_ENV) {
    throw "Error NODE_ENV undefined";
}

if (!process.env.NODE_PATH) {
    throw "Error NODE_PATH undefined";
}

var express     = require('express'),
    app         = express(),
    port        = 3001;

require('./modules/orm').load();
require('./modules/auth').load(app);
require('./modules/api').load(app);

app.listen(port);

console.log('Server running on port ' + port + '....');

module.exports = app;
