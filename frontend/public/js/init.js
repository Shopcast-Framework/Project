(function($){
  $(function(){

    $( '.button-collapse').sideNav();
    $( '#main .wrapper-content' ).css( "height", $( window ).height() - 200 );
    $('.modal-trigger').leanModal();
	$(".dropdown-button").dropdown();
	$('select').material_select();
        
    //alert($( window ).height());
    //alert($( '#main .wrapper-content' ).height());

  }); // end of document ready
})(jQuery); // end of jQuery name space


