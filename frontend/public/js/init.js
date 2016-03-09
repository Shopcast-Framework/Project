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

	// Create toast for message
	var message = getURLParameter( "message" );
	if ( message !== null && message !== undefined )
	{
		var content = "<span>" + decodeURIComponent(message) + "</span>";
		Materialize.toast(content, 4000);
	}

})(jQuery); // end of jQuery name space

function getURLParameter(sParam)
{
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
	{
		var sParameterName = sURLVariables[i].split('=');
	    if (sParameterName[0] == sParam)
		{
	    	return sParameterName[1];
	    }
	}
}