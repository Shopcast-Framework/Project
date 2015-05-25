var files = [];

$(function() {

	function changeFile()
	{
		$( '.file' ).change(function(e) {
		    var file = e.target.files[0];

		    if ( $( this ).attr( "data-number" ) == "-1" )
		    {
		    	$( this ).attr( "data-number", files.length );
		    	files.push( file );
		    }
		    else
		    	files[ $( this ).attr( "data-number" ) ] = file;
		    
		});
	}

	function removeFile()
	{
		$( '.btn-delete' ).click( function(e) {

			$( '.list-files .item' ).each(function(e) {
			    
			    if ( $( this ).children( 'input[type="checkbox"]' ).prop( 'checked' ) == true )
			    {
			    	files[ $( this ).children( 'input[type="file"]' ).attr( 'data-number' ) ] = null;
			    	$( this ).remove();
			    }
			    
			});

		});
	}

	$( ".sortable" ).sortable();

	var socket = io.connect( '/upload' );

  	$( '.btn-add' ).click( function(e) {

		$( '.list-files' ).prepend( '<li class="item"><input type="checkbox"/><input type="file" class="file" data-number="-1"/></li>' );
		$( ".sortable" ).sortable();

		changeFile();
		removeFile();

	});

	$( '.btn-upload' ).click( function(e) {

		$.each( files, function( index, file ) {

			if ( files != null )
			{
				var stream = ss.createStream();

			    // upload a file to the server.
			    ss( socket ).emit( 'file', stream, { size: file.size, name: file.name } );
			    ss.createBlobReadStream( file ).pipe( stream );
			}

		});

	});

});