(function($){

    $("#existing-file form").submit(function(e){
        e.preventDefault();
        console.log($(this).serializeArray());
    });

    // $("#form-edit").submit(function(e){
    //    e.preventDefault();
    //
    //     $.ajax({
    //         url: $(this).attr("action"),
    //         method:"post",
    //         success: function(data) {
    //             console.log(data);
    //             Materialize.toast( 'I am a toast!', 4000 );
    //         },
    //         error: function() {
    //             Materialize.toast( 'Error', 4000 );
    //         }
    //     })
    // });

})(jQuery); // end of jQuery name space

