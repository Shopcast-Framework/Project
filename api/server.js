'use strict';

var express = require('express'),
    app = express(),
    api = require('./api');

app.listen(3000);

api.load(app);
console.log('Server running....');
