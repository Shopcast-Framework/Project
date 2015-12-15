var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );

// Load the route handlers

var dashboard = require( './routes/dashboard' );
var content = require( './routes/content' );
var users = require( './routes/users' );
var displayMode = require( './routes/displayMode' );
var config = require( './routes/config' );

var app = express();

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );
app.set( 'view options', { layout: false } );


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// All the http's routes
app.get( '/', dashboard.index ); // Dasboard  page
app.get( '/upload', content.upload ); // upload files page
app.get( '/files', content.files ); // manage files page
app.get( '/playlists', content.playlists ); // manage playlists page
app.get( '/users', users.list ); // manage users page
app.get( '/display-modes', displayMode.list ); // manage display mode page
app.get( '/settings', config.list ); // manage configuration page


// catch 404 and forward to error handler
app.use(function( req, res, next ) {
    var err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
});

// error handlers

// development error handler
// will print stacktrace
if (app.get( 'env' ) === 'development' ) {
    app.use( function( err, req, res, next ) {
        res.status( err.status || 500 );
        res.render( 'error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use( function( err, req, res, next ) {
    res.status( err.status || 500 );
    res.render( 'error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
