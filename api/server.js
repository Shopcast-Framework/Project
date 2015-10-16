'use strict';

var express = require('express'),
    app     = express(),
    api     = require('./api');

require('./orm').load();


app.listen(3000);

api.load(app);
console.log('Server running....');
