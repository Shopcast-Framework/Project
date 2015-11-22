$( function () {


        // Build the chart
        $('#graph').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Utilisations des playlists'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Utilisation',
                data: [
                    ['Classique',   45.0],
                    ['Electro',       26.8],
                    {
                        name: 'Folk',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['Jazz',    8.5],
                ]
            }]
        });

        $('#graph2').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: "Temps moyen de visionnage"
                },
                xAxis: {
                    categories: [
                        'Lundi',
                        'Mardi',
                        'Mercredi',
                        'Jeudi',
                        'Vendredi',
                        'Samedi',
                        'Dimanche'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Durée (min)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Electro',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6 ]

                }, {
                    name: 'Classique',
                    data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0 ]

                }, {
                    name: 'Jazz',
                    data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0 ]

                }, {
                    name: 'Folk',
                    data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4 ]

                }]
            });

});