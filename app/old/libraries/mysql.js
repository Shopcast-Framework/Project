var mysql = require('mysql');

function Mysql()
{
	this.connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'Eip',
	  password : 'Eip',
	  database : 'Eip',
	});
}

Mysql.prototype.connect = function()
{
	this.connection.connect(function(err) {
	  	if ( err ) throw err;
	});
}

Mysql.prototype.disconnect = function()
{
	this.connection.end(function( err ) {
	  	if ( err ) throw err;
	});
}

Mysql.prototype.executeQuery = function( sql )
{
	var query = this.connection.query( sql, function( err, rows, fields ) {
	  if ( err ) throw err;
	});
}


module.exports = Mysql;