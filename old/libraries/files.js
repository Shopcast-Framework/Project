var Mysql = require( '../libraries/mysql' );
var mysql = require('mysql');

function Files()
{
}

Files.prototype.save = function( filename, customer )
{
	bdd = new Mysql();

	bdd.connect();

	var sql = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
	var inserts = [ "files", "filename", filename, "customer_id", customer ];
	sql = mysql.format( sql, inserts );

	bdd.executeQuery( sql );
}

Files.prototype.add = function( filename, customer )
{
	bdd = new Mysql();

	bdd.connect();

	var sql = "INSERT INTO ?? (??, ??) VALUES (?, ?)";
	var inserts = [ "files", "filename", "customer_id", filename, customer ];
	sql = mysql.format( sql, inserts );

	bdd.executeQuery( sql );
}



module.exports = Files;