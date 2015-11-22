$(function() {

	// Close the box
	$( "#box .close" ).click( function(){
		$( this ).parent().animate( { top : "-100%" }, 600 );
		$( "#shadow" ).hide();
	} ); 

	// Open the box
	$( ".user .user-img > img" ).click( function(){
		$( "#box" ).animate( { top : "20%" }, 600 );
		$( "#shadow" ).show();
	} ); 

});