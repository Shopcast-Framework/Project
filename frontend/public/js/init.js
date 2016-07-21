(function($){
    
    $( '.button-collapse').sideNav();
    $( '#main .wrapper-content' ).css( "height", $( window ).height() - 200 );
    $('.modal-trigger').leanModal();
	$(".dropdown-button").dropdown();
	$('select').material_select();
	$('ul.tabs').tabs();

	// Sortable
	$( ".sortable" ).sortable({
    	helper: fixWidthHelper,
    	update: function( event, ui ) {
    		updateListPosition();
    	}
	}).disableSelection();
    
	function fixWidthHelper(e, ui) {
	    ui.children().each(function() {
	        $(this).width($(this).width());
	    });
	    return ui;
	}

	function updateListPosition()
	{
		var count = 0;

		$(".sortable .sortable-item").each(function(){
			$(this).data("rank", count);
			$(this).children(".rank").html(count);
			count++;
		});

		$("#playlist .list-files .actions-header .btn-save").removeClass("disabled");
		$("#playlist .list-files .actions-header .btn-save").prop("disabled", false);
	}

	$("#playlist .list-files .actions-header .btn-save").click(function(e){
		e.preventDefault();

		var data = {ids: []};
		$(".sortable .sortable-item").each(function(){
			data.ids.push($(this).data("id"));
		});


		$.post($(".form-sort-file").attr("action"), data, function(data) {
  			Materialize.toast(data.message, 4000);
		}).fail(function(err) {
    		Materialize.toast(err.message, 4000);
  		});
	});


	$( "#main .search-wrapper #search" ).keyup(function(){
		var val = $( this ).val();
		$( "#main .wrapper-content .listing tbody tr" ).each(function(){
			var keywords = $( this ).data( "keywords" ).toLowerCase();
			if ( keywords.indexOf( val.toLowerCase() ) != -1 )
				$( this ).show();
			else
				$( this ).hide()
		})
	});

	$( ".modal-edit" ).click(function() {
		var form = $( this ).data( "target" );
		$("#" + form + " input, #" + form + " textarea").each(function(){
			if ($( this ).data("disabled") != true)
				$( this ).prop( "disabled", false );
		});

		$( "#" + form + " .actions" ).show();
        $( "header.actions .btn" ).hide();
	});

    $( ".modal-edit-cancel" ).click(function() {
        e.preventDefault();
        window.location.reload();
    });

	// Init substitue
	$( "#main .substitute" ).css( "height", $( "#main .search-wrapper" ).height() );
	$( "#main .substitute" ).css( "display", "none" );

	// Watch the scroll
	$( window ).scroll( function() {
		var searchBar = $( "#main .search-wrapper" );
		var substitute = $( "#main .substitute" );

		if ( searchBar.length != 0 )
		{
			var top = searchBar.offset().top;
			if ( searchBar.hasClass( "fixed" ) )
				top = substitute.offset().top;

			if ( ( top - $( window ).scrollTop() ) <= 0 )
			{
				substitute.css( "display", "block" );
				searchBar.addClass( "fixed" );
				searchBar.children( "nav" ).removeClass( "z-depth-01" ).addClass( "z-depth-1" );
			}
			else
			{
				substitute.css( "display", "none" );
				searchBar.removeClass( "fixed" );
				searchBar.children( "nav" ).removeClass( "z-depth-1" ).addClass( "z-depth-01" );
			}
		}

	});

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