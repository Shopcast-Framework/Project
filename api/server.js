'use strict';

var express     = require('express'),
    app         = express(),
    port        = 3001;

require('./orm').load();
require('./auth').load(app);
require('./api').load(app);

app.listen(port);

console.log('Server running on port ' + port + '....');
