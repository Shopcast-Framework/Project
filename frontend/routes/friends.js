'use strict';

var express	= require('express'),
	router	= express.Router(),
	Promise	= require('promise'),
	Rest	= require('../rest'),
	menu	= require(__dirname + '/../modules/menu.js'),
	upload  = require('multer')({ dest: 'public/uploads/' });

router.post('/edit', function(req, res) {
    Rest
    .put('user/' + req.body.user + '/friend/' + req.body.friend, JSON.stringify({accepted: true}))
    .then(function(ans) {
        res.redirect('/friends?message=' + ans.message);
    }, function(err) {
        res.redirect('/friends?message=' + err.message);
    });
});

router.post('/', function(req, res) {
    Rest
    .post('user/' + req.body.user + '/friend', JSON.stringify({friend_id: req.body.friend}))
    .then(function(ans) {
        res.redirect('/friends?message=' + ans.body.message);
    }, function(err) {
        res.redirect('/friends?message=' + err.message);
    });
});

router.get('/', function(req, res) {
	var promises = [];

	promises.push(Rest.get('user/' + req.session.user.id + '/friend'));

	Promise.all(promises).then(function(values) {
		var friends = values[0].body.friends;

		res.render('friends', {
			title: 'Shopcast - Friend',
			titleContent: 'My friend',
			active: '/friends',
            user: req.session.user,
			friends: friends,
			menu: menu.load(req.session.user)
		});
	}, function(err) {
		console.log(err);
	});
});

module.exports = router;
