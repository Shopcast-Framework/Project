'use strict';

var express = require('express');
var app = express();
var api = require('./api');

app.listen(3000);

api.load(app);
console.log('Server running....');
