'use strict';

var express = require('express'),
	router = express.Router(),
	Promise = require('promise'),
	Rest	= require('../rest'),
	menu    = require(__dirname + '/../modules/menu'),
    middlewares = require('../middlewares'),
    translate = require('../languages');

router.post('/',middlewares.isLogged, function(req, res) {

    Rest.post('planning', JSON.stringify(req.body)).then(function(response) {
        res.redirect('/calendar?message=' + response.body.message);
    }, function(err) {
        console.log(err); 
        res.redirect('/calendar?message=' + err.body.message);
    });
});

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
    promises.push(Rest.get('monitor'));
    promises.push(Rest.get('playlist'));
    promises.push(menu.load(req.session.user));

    Promise.all(promises).then(function(values) {

        var events = [];
        values[0].body.plannings.forEach(function(element,index,array){
            var tmp = {
                id: element.id,
                title: element.title,
                start: element.range_start,
                end: element.range_end,
                color: '#03A9F4',
                textColor: 'white',
                description: 'This is a cool event'
            };
            events.push(tmp);
        });

    	res.render('plannings/index', {
    		active: '/plannings',
            menu: values[3],
            events: events,
            plannings: values[0].body.plannings,
            monitors: values[1].body.monitors,
            playlists: values[2].body.playlists,
            isLogged: true,
            isSearchBar: false,
            session: req.session.user,
            translate : translate.getWordsByPage( req.cookies.language, "Plannings" ),
            language: req.cookies.language
    	});
    });
});

module.exports = router;
