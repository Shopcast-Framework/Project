'use strict';

var app = require('express')();

require('./orm').load();
require('./api').load(app);

app.listen(3000);

console.log('Server running....');
