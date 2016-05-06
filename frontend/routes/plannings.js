'use strict';

var express = require('express'),
	router = express.Router(),
	Promise = require('promise'),
	Rest	= require('../rest'),
	menu    = require(__dirname + '/../modules/menu.js');

router.get('/:id', function(req, res) {
    var promises = [];

    promises.push(Rest.get('planning/' + req.params.id));

    Promise.all(promises).then(function(values) {
        console.log(values[0].body.planning);
        res.render('plannings/show', {
            title: 'Shopcast - Plannings',
            titleContent: 'Plannings',
            active: '/plannings',
            planning: values[0].body.planning,
            menu: menu.load(req.session.user)
        });
    });
});

router.get('/', function(req, res) {
    var promises = [];

    promises.push(Rest.get('planning'));

    Promise.all(promises).then(function(values) {
    	res.render('plannings/index', {
    		title: 'Shopcast - Plannings',
    		titleContent: 'Plannings',
    		active: '/plannings',
            plannings: values[0].body.plannings,
    		menu: menu.load(req.session.user)
    	});
    });
});

module.exports = router;
