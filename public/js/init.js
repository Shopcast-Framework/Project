(function($){
  $(function(){

    $( '.button-collapse').sideNav();
    $( '#main .wrapper-content' ).css( "height", $( window ).height() - 200 )
    //alert($( window ).height());
    //alert($( '#main .wrapper-content' ).height());

  }); // end of document ready
})(jQuery); // end of jQuery name space


