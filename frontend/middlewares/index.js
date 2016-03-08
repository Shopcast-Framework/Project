module.exports = {

    isLogged: function(req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('signin');
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