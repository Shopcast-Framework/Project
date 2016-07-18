'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res){

	res.sendfile(path.resolve('site_vitrine/index.html'));

});

router.get('/contact', function(req, res){

	res.sendfile(path.resolve('site_vitrine/contacts.html'));

});

module.exports = router;
