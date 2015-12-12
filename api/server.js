'use strict';

var express     = require('express'),
    app         = express();

require('./orm').load();
require('./auth').load(app);
require('./api').load(app);

app.listen(3000);

console.log('Server running....');
