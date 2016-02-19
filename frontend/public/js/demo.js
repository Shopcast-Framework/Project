(function($){
  $(function(){

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    // Range

    var slider = document.getElementById('time');

    noUiSlider.create(slider, {
        start: [ 3 ],
        step: 1,
        range: {
            'min': [ 0 ],
            'max': [ 7 ]
        }
    });

    slider.noUiSlider.on('slide', updateRange);

    function updateRange ( values, handle, unencoded ) {
        $("#time-value").html("Time : " + parseInt(values) + " day(s)");
        $("#time").attr("data-time", parseInt(values) );
    }

    // Map

    var map = new GMaps({
      el: '#map',
      lat: -12.043333,
      lng: -77.028333
    });

    $( "#button-search" ).click( function(){

      getUsersFromApi( map );

    });

    // Initialize all fllows people
    getUsersFromApi( map );



  }); // end of document ready
})(jQuery); // end of jQuery name space


function getUsersFromApi( map )
{
  $("#wait-bar").show();
  $("#list-users").css("opacity", 0.5);
  $("#title-follow").html( "Follows (?)" );

  var options = { token: GetURLParameter( "token" ) };

  // Choose url
  var url = "http://omega.florian-guerin.fr/api/v1/map/follows";
  if ( $( "#followers" ).prop('checked') == true && $( "#follows" ).prop('checked') == false )
    url = "http://omega.florian-guerin.fr/api/v1/map/followers";

  // Choose Time
  if ( $( "#time" ).attr("data-time") !== undefined )
  {
    var maxDate = new Date();
    var minDate = new Date();
    maxDate.setHours(23, 59, 0);
    minDate.setHours(0, 1, 0);
    minDate.setDate(minDate.getDate() - parseInt( $( "#time" ).attr("data-time") ) ); 
    maxDate.setDate(maxDate.getDate() - parseInt( $( "#time" ).attr("data-time") ) );
    options.min_date = parseInt( minDate.getTime() / 1000 );
    options.max_date = parseInt( maxDate.getTime() / 1000 );
  }

  $.get( url, options, function( data ){

        $("#list-users .collection-item").remove();
        $("#list-users").css("opacity", 1);
        $("#wait-bar").hide();
        var count = 0;
        map.removeMarkers();
        for ( var key in data )
        {
          if (data[key].location !== undefined && data[key].location !== null && data[key].location.latitude !== undefined)
          {
            count++;
            var marker = map.addMarker({
              lat: data[key].location.latitude,
              lng: data[key].location.longitude,
              infoWindow:  {
                  content: data[key].user.full_name
              }
            });
            $("#list-users").append('<li class="collection-item avatar"><img src="' + data[key].user.profile_picture + '" alt="" class="circle" /><span class="title">' + 
              '<a href="https://instagram.com/' + data[key].user.username + '" target="_blank">' + data[key].user.full_name + '</a></span><p>' + data[key].user.username + '</p><p class="distance"></p><span class="secondary-content get-position" data-lat="' + data[key].location.latitude + '" data-lng="' + data[key].location.longitude + '"><i class="material-icons small">room</i></span></li>');
          }
          $("#title-follow").html( "Follows (" + count + ")" );
          getPosition( map );
        }
        $( "#list-users .collection-item .get-position" ).click( function(){
          map.setCenter($(this).attr("data-lat"), $(this).attr("data-lng"));
          map.setZoom(10);
        });

    }).fail(function(errorThrown, xhr) {
      Materialize.toast('Erreur', 3000)
      $("#wait-bar").hide();
      console.log(errorThrown.responseText);
    });
}

function rad( x ) {
  return x * Math.PI / 180;
};

function getDistance( p1, p2 ) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad( p2.lat - p1.lat() );
  var dLong = rad( p2.lng - p1.lng() );
  var a = Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
  Math.cos( rad( p1.lat() ) ) * Math.cos( rad( p2.lat ) ) *
  Math.sin( dLong / 2 ) * Math.sin( dLong / 2 );
  var c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) );
  var d = R * c;
  return d; // returns the distance in meter
};

function getPosition( map )
{

  GMaps.geocode({
      address: $('#address').val(),
      callback: function(results, status) {
          if (status == 'OK') {
            var latlng = results[0].geometry.location;
            map.setCenter(latlng.lat(), latlng.lng());
            map.addMarker({
              lat: latlng.lat(),
              lng: latlng.lng(),
              infoWindow:  {
                content: 'Your position'
              }
            });
            $("#list-users .collection-item .get-position").each(function(){
              var dest = { lat: parseFloat($(this).attr("data-lat")), lng: parseFloat($(this).attr("data-lng"))};
              var distance = getDistance(latlng, dest).toFixed(0);
              if (distance > 1000)
                distance /= 1000;
              $(this).prev("p").html(distance + " m");
              if ($("#distance").val() != "" && parseFloat($("#distance").val()) < distance )
                $(this).parent().hide();
              else
                $(this).parent().show();
            });
          }
        }
  });
}

function GetURLParameter(sParam)
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