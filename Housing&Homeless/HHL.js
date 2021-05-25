mapboxgl.accessToken =
    'pk.eyJ1IjoibGluZ3dlaXoiLCJhIjoiY2trNWFsNzRvMG9pajJ3cW5udHpjaGlldyJ9._WoXMc4ffb6xIBNNl764Kw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lingweiz/ckm1s6opnahsr17ljtnyztrma',
    center: [-0.125, 51.515],
    zoom: 9.5
});



// Create an array of the available data years
var years = [
    '2004',
    '2006',
    '2008',
    '2010',
    '2012',
    '2014',
    '2016',
    '2018',
    '2020'
];


map.on('load',
    function () { // This is our first example of asynchronous JS. We can only add additional layers after the map has loaded

        // This is the main function that runs when the user changes the data year
        function setYear(year) {

            document.getElementById('year').textContent = years[year]; // Set the label to the correct year

            var pp = map.getPaintProperty('homeless', 'fill-color');

            console.log(pp);
            pp.property = "HL" + years[year]; // update the pp fill-color to the new column set by the user

            map.setPaintProperty('homeless', 'fill-color', pp);

            console.log(map.getPaintProperty('homeless', 'fill-color'));

            var yearcol = "HL" + String(years[year]);
            /*var textfield = "{" + yearcol + "}";*/

            console.log(textfield);

            map.setLayoutProperty('labels', 'text-field',
                textfield); // update the labels layer to the new column
            var filters = ['>', yearcol, 30];
            map.setFilter('labels', filters);
        }


        // This is the main function that runs when the user changes the data year
        function setYear1(year) {

            document.getElementById('year').textContent = years[year]; // Set the label to the correct year

            var pp = map.getPaintProperty('hpi', 'fill-color');

            console.log(pp);
            pp.property = "HP" + years[year]; // update the pp fill-color to the new column set by the user

            map.setPaintProperty('hpi', 'fill-color', pp);

            console.log(map.getPaintProperty('hpi', 'fill-color'));

            var yearcol = "HP" + String(years[year]);
            /*var textfield = "{" + yearcol + "}";*/

            console.log(textfield);

            map.setLayoutProperty('labels', 'text-field',
                textfield); // update the labels layer to the new column
            var filters = ['>', yearcol, 30];
            map.setFilter('labels', filters);
        }

        // Add the fill layer to the map
        map.addSource('choro', {
            type: 'vector',
            // Use any Mapbox-hosted tileset using its tileset id.
            // Learn more about where to find a tileset id:
            // https://docs.mapbox.com/help/glossary/tileset-id/
            url: 'mapbox://lingweiz.dnf6iiqf'
        });

        map.addLayer({
            id: 'homeless',
            type: 'fill',
            source: 'choro',
            'source-layer': 'HPI-6r1fnu', // name of tileset layer
            'layout': {
                'visibility': 'visible'
            },
            paint: {
                'fill-outline-color': '#000000',
                'fill-color': {
                    property: 'HL2004',
                    stops: [
                        [0, "#ffffcc"],
                        [2, "#ffeda0"],
                        [4, "#fed976"],
                        [6, "#feb24c"],
                        [8, "#fd8d3c"],
                        [10, "#fc4e2a"],
                        [12, "#e31a1c"],
                        [14, "#bd0026"],
                        [16, "#800026"],
                    ]
                }
            }
        });

        map.addLayer({
            id: 'hpi',
            type: 'fill',
            source: 'choro',
            'source-layer': 'HPI-6r1fnu', // name of tileset layer
            'layout': {
                'visibility': 'visible'
            },
            paint: {
                'fill-opacity': 0,
                'fill-outline-color': '#000000',
                'fill-color': {
                    property: 'HP2004',
                    stops: [
                        [35, "#ffffcc"],
                        [50, "#ffeda0"],
                        [65, "#fed976"],
                        [80, "#feb24c"],
                        [95, "#fd8d3c"],
                        [110, "#fc4e2a"],
                        [125, "#e31a1c"],
                        [140, "#b10026"]
                    ]
                }
            }
        });

        map.addLayer({ //Add the fill layer. It is not visible (opacity 0) and is used only as the basis of the hover selection
            id: 'LocalAuthorities',
            type: 'fill',
            source: 'choro',
            'source-layer': 'HPI-6r1fnu', // name of tilesets
            'layout': {
                'visibility': 'visible'
            },
            paint: {
                'fill-color': '#fff',
                'fill-opacity': 0
            }
        });

        map.addLayer({ // Add the line highlight layer. This layer has a filter, which initially is empty.
            id: 'lahighlight',
            type: 'line',
            source: 'choro',
            'source-layer': 'HPI-6r1fnu', // name of tilesets
            'layout': {
                'visibility': 'visible'
            },
            paint: {
                'line-color': '#adf',
                'line-width': 4
            },
            filter: ['==', 'Borough', 'empty']
        });


        map.on('mousemove', function (
            e) { // This is the main event listner which is triggered when the mouse moves
            var la = map.queryRenderedFeatures(e
                .point, { // This queries whether the mouse is over an object in the LocalAuthorities layer
                    layers: ['LocalAuthorities']
                });


            if (la.length ==
                1) { // This if statement is run when the mouse is over a local authority

                map.setFilter('lahighlight', ['==', 'Borough', la[0].properties
                    .Borough
                ]); // Filter the highlight layer to show the local authority outline
                console.log(la[0].properties.Borough);
                document.getElementById('laname').innerHTML = la[0].properties
                    .Borough +":<br><br> Homeless (Per Thousand): <br>"+ "From " + la[0].properties.HL2004 + " to " + la[0].properties.HL2020
                    + "<br><br> House Price Index: <br>"+ "From " + la[0].properties.HP2004 + " to " + la[0].properties.HP2020; // Change the name in the top left box to show the local authority name
                console.log(la[0].id);
                console.log(la);

            } else {
                map.setFilter('lahighlight', ['==', 'Borough', 'null']);
                console.log('No features');
                document.getElementById('laname').innerHTML = "Hover over a local authority";
            }


        });


        // Assign an event listner to the slider so that the setYear function runs when the user changes the slider
        document.getElementById('slider').addEventListener('input', function (e) {
            var year = parseInt(e.target.value);
            setYear(year);
        });

        document.getElementById('slider').addEventListener('input', function (e) {
            var year = parseInt(e.target.value);
            setYear1(year);
        });

        var hlLegendEl = document.getElementById('hl-legend');
        var hpLegendEl = document.getElementById('hp-legend');

        //Event listener for layer switch
        document.getElementById("layer1").addEventListener("click", function () {
            map.setPaintProperty('homeless', 'fill-opacity', 1);
            map.setPaintProperty('hpi', 'fill-opacity', 0);
            hpLegendEl.style.display = 'none';
            hlLegendEl.style.display = 'block';

        });

        document.getElementById("layer2").addEventListener("click", function () {
            map.setPaintProperty('homeless', 'fill-opacity', 0);
            map.setPaintProperty('hpi', 'fill-opacity', 1);
            hlLegendEl.style.display = 'none';
            hpLegendEl.style.display = 'block';
        });




        var chartDom = document.getElementById('container1');
        var myChart1 = echarts.init(chartDom, 'dark');
        var option1;

        var data = [
            ["2004", 253.00],
            ["2006", 152.90],
            ["2008", 119.30],
            ["2010", 100.80],
            ["2012", 147.90],
            ["2014", 166.90],
            ["2016", 161.20],
            ["2018", 193.90],
            ["2020", 164.40]

        ];
        var data1 = [
            ["2004", 56.6],
            ["2006", 61.96],
            ["2008", 71.35],
            ["2010", 70.47],
            ["2012", 75.24],
            ["2014", 94.88],
            ["2016", 114.87],
            ["2018", 117.85],
            ["2020", 119.07]

        ];

        var dateList = data.map(function (item) {
            return item[0];
        });
        var valueList = data.map(function (item) {
            return item[1];
        });

        var dateList1 = data1.map(function (item) {
            return item[0];
        });
        var valueList1 = data1.map(function (item) {
            return item[1];
        });

        option1 = {

            // Make gradient line here
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 300
            }, {
                show: false,
                type: 'continuous',
                seriesIndex: 1,
                dimension: 0,
                min: 0,
                max: dateList1.length - 1
            }],


            title: [{
                top: '5%',
                left: 'center',
                text: 'Homeless Per 1000 Households'
            }, {
                top: '50%',
                left: 'center',
                text: 'Total House Price Index'
            }],
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                data: dateList
            }, {
                data: dateList1,
                gridIndex: 1
            }],
            yAxis: [{
                min: 50,
                max: 300
            }, {
                min: 40,
                max: 120,
                gridIndex: 1
            }],
            grid: [{
                bottom: '60%'
            }, {
                top: '60%'
            }],
            series: [{
                type: 'line',
                showSymbol: false,
                data: valueList

            }, {
                type: 'line',
                showSymbol: false,
                data: valueList1,
                xAxisIndex: 1,
                yAxisIndex: 1
            }]
        };

        option1 && myChart1.setOption(option1);



    });