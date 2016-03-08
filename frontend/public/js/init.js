(function($){

    $( '.button-collapse').sideNav();
    $( '#main .wrapper-content' ).css( "height", $( window ).height() - 200 );
    $('.modal-trigger').leanModal();
	$(".dropdown-button").dropdown();
	$('select').material_select();
	$('ul.tabs').tabs();

	$( "#main .search-wrapper #search" ).keyup(function(){
		var val = $( this ).val();
		$( "#main .wrapper-content .listing tbody tr" ).each(function(){
			var keywords = $( this ).data( "keywords" ).toLowerCase();
			if ( keywords.indexOf( val.toLowerCase() ) != -1 )
				$( this ).show();
			else
				$( this ).hide()
		})
	})

})(jQuery); // end of jQuery name space


