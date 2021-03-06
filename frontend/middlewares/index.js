var fs = require('fs');

module.exports = {

    isLogged: function(req, res, next) {

        // Test logged
        if (req.session.user) {
            // Test Avatar
            try{
                fs.statSync(String(req.session.user.avatar));
            }catch(err){
                console.log(req.session.user);
                if (req.session.user.sex == 0)
                    req.session.user.avatar = "/public/images/users/default_h.png";
                else
                    req.session.user.avatar = "/public/images/users/default_f.png";
            }

            next();
        } else {
            res.redirect('/signin');
        }
    },

    isAdmin: function(req, res, next) {

        // Test logged
        if (req.session.user) {

            next();
        } else {
            res.redirect("/dashboards?message=You can't access this resource");
        }
    },

    language: function(req, res, next){

        // change the language
        if ( req.query.language !== undefined && req.query.language !== null )
        {
            res.cookie( 'language',req.query.language, { maxAge: 900000, httpOnly: true } ); // Create cookie for language
            res.redirect( req.baseUrl );
            return;
        }

        // create the language cookie if is missing
    	if ( req.cookies.language === undefined || req.cookies.language == null )
    	{
			res.cookie( 'language',"fr", { maxAge: 900000, httpOnly: true } ); // Create cookie for language
			res.redirect( req.baseUrl );
    	}
		else
			next();
    }
    
};
