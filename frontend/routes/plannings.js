'use strict';

var express = require('express'),
	router = express.Router(),
	Promise = require('promise'),
	Rest	= require('../rest'),
	menu    = require(__dirname + '/../modules/menu'),
    middlewares = require('../middlewares'),
    translate = require('../languages');

router.get('/:id', middlewares.isLogged, middlewares.language, function(req, res) {
    var promises = [];

    promises.push(Rest.get('planning/' + req.params.id));
    promises.push(menu.load(req.session.user));

    Promise.all(promises).then(function(values) {
        console.log(values[0].body.planning);
        res.render('plannings/show', {
            active: '/plannings',
            menu: values[1],
            planning: values[0].body.planning,
            isLogged: true,
            isSearchBar: true,
            session: req.session.user,
            translate : translate.getWordsByPage( req.cookies.language, "Plannings" ),
            language: req.cookies.language
        });
    });
});

router.get('/', middlewares.isLogged, middlewares.language, function(req, res) {
    var promises = [];

    promises.push(Rest.get('planning'));
    promises.push(menu.load(req.session.user));

    Promise.all(promises).then(function(values) {
    	res.render('plannings/index', {
    		active: '/plannings',
            menu: values[1],
            plannings: values[0].body.plannings,
            isLogged: true,
            isSearchBar: false,
            session: req.session.user,
            translate : translate.getWordsByPage( req.cookies.language, "Plannings" ),
            language: req.cookies.language
    	});
    });
});

module.exports = router;
