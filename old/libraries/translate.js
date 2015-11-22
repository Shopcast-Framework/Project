function Translate( language )
{
	this.language = language;
}

Translate.prototype.word = function( word )
{

	var parsedJSON = require("../languages/" + this.language + ".json" );
	return parsedJSON[word];

}


Translate.prototype.changeLanguage = function ( language )
{
	this.language = language;
}



module.exports = Translate;