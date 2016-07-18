
// Manage the grid

//$('#dashboard').magnet();

// Playlists views

var data = {
  labels: ['7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h'],
  series: [
    [5, 4, 3, 7, 5, 10, 12, 22, 26, 15, 5, 20],
    [15, 7, 9, 10, 15, 15, 20, 30, 4, 20, 22, 17],
    [0, 0, 2, 3, 4, 5, 6, 13, 10, 5, 1, 3],
  ]
};

var options = {

	height:250,
  	showPoint: false,
  	showArea: true,
  	lineSmooth: false,
  	axisX: {
    	showGrid: false,
    	showLabel: true
  	},
  	axisY: {
    	offset: 60,
    	labelInterpolationFnc: function(value) {
      		return value;
    	}
  	}
};

var chartPlaylist = new Chartist.Line('#chart-playlist-view', data, options);

chartPlaylist.on('draw', function(data) {
  if(data.type === 'line' || data.type === 'area') {
    data.element.animate({
      d: {
        begin: 1000 * data.index,
        dur: 1200,
        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
        to: data.path.clone().stringify(),
        easing: Chartist.Svg.Easing.easeOutQuint
      }
    });
  }
});

// Display use views

var data = {
  	labels: ['Moniteur 1', 'Moniteur 2 ', 'Moniteur 3'],
  	series: [40, 80, 60]
}

var options = {
	height: 250,
  	distributeSeries: true,
  	axisX: {
    	showGrid: false,
    	showLabel: true
  	},
  	axisY: {
    	offset: 60,
    	labelInterpolationFnc: function(value) {
      		return value + " min";
    	}
  	}
}

var chartDisplay = new Chartist.Bar('#chart-display', data, options);

chartDisplay.on('draw', function(data) {
  if(data.type === 'bar') {
    data.element.animate({
    	x1: {
    		begin: 1000 * data.seriesIndex,
		    dur: 1200,
		    from: -150,
		    to: data.x1,
		    easing: Chartist.Svg.Easing.easeOutQuint
		},
	  	x2: {
	  		begin: 1000 * data.seriesIndex,
	    	dur: 1200,
	    	from: -150,
	    	to: data.x2,
	    	easing: Chartist.Svg.Easing.easeOutQuint
	  	},
	});
  }
});