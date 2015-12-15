var express = require('express');
var router = express.Router();

// Sequalize variable
var models  = require('../sequelize/models');
var UserModel = models.users;

// Token
var jwt = require('jsonwebtoken');
var tokenConfig = require('../config_token');

router.post('/', function(req, res) { // Login request for the user

	var username = req.body.username || req.query.username;
	var password = req.body.password || req.query.password;

    UserModel.findOne({ where: {username: username, password: password} }).then(function(data) {

    	var user = JSON.parse(JSON.stringify(data));
    	if (!user) 
    	{
	    	res.status(404).json({ success: false, message: 'Authentication failed. User not found.' });
	    } 
	    else if (user) 
	    {
    		// check if password matches
      		if (user.password != password) 
      		{
        		res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
      		} 
	      	else 
	      	{
		        // if user is found and password is right
		        // create a token
		        var token = jwt.sign({id: user.id}, tokenConfig.privateKey, {
		          expiresInMinutes: 200 // expires in 200 minutes
		        });

		        // delete some user informations

		        delete user.instagramToken;

		        // return the information including token as JSON
		        res.status(200).json({
		          success: true,
		          message: 'Use this token in each request. It will be expired in 200 minutes.',
		          user: user,
		          token: token
		        });
	      	}
    	} 

    });

});


module.exports = router;
