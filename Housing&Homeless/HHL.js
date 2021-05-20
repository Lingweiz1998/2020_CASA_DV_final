mapboxgl.accessToken =
    'pk.eyJ1IjoibGluZ3dlaXoiLCJhIjoiY2trNWFsNzRvMG9pajJ3cW5udHpjaGlldyJ9._WoXMc4ffb6xIBNNl764Kw';
var beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'mapbox://styles/lingweiz/ckol4p2n21bzq17l3aciuyfpu',
    center: [-0.125, 51.515],
    zoom: 9.5
});

var afterMap = new mapboxgl.Map({
    container: 'after',
    style: 'mapbox://styles/lingweiz/ckm1s6opnahsr17ljtnyztrma',
    center: [-0.125, 51.515],
    zoom: 9.5
});

// A selector or reference to HTML element
var container = '#comparison-container';

var map = new mapboxgl.Compare(beforeMap, afterMap, container, {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true
});

// Create an array of the available data years
var years = [
    '2004',
    '2009',
    '2014',
    '2019'
];


beforeMap.on('load',
    function () { // This is our first example of asynchronous JS. We can only add additional layers after the map has loaded

        // This is the main function that runs when the user changes the data year
        function setYear(year) {

            document.getElementById('year').textContent = years[year]; // Set the label to the correct year

            var pp = beforeMap.getPaintProperty('stock', 'circle-radius');

            console.log(pp);
            pp.property = "ST" + years[year]; // update the pp circle-radius to the new column set by the user

            beforeMap.setPaintProperty('stock', 'circle-radius', pp);

            console.log(beforeMap.getPaintProperty('stock', 'circle-radius'));

            var yearcol = "ST" + String(years[year]);
            /*var textfield = "{" + yearcol + "}";*/

            console.log(textfield);

            beforeMap.setLayoutProperty('labels', 'text-field',
                textfield); // update the labels layer to the new column
            var filters = ['>', yearcol, 30];
            beforeMap.setFilter('labels', filters);
        }

        function setYear1(year) {

            document.getElementById('year').textContent = years[year]; // Set the label to the correct year

            var pp = beforeMap.getPaintProperty('vacant', 'circle-radius');

            console.log(pp);
            pp.property = "VC" + years[year]; // update the pp circle-radius to the new column set by the user

            beforeMap.setPaintProperty('vacant', 'circle-radius', pp);

            console.log(beforeMap.getPaintProperty('vacant', 'circle-radius'));

            var yearcol = "VC" + String(years[year]);
            /*var textfield = "{" + yearcol + "}";*/

            console.log(textfield);

            beforeMap.setLayoutProperty('labels', 'text-field',
                textfield); // update the labels layer to the new column
            var filters = ['>', yearcol, 30];
            beforeMap.setFilter('labels', filters);
        }

        function setYear2(year) {

            document.getElementById('year').textContent = years[year]; // Set the label to the correct year

            var pp = afterMap.getPaintProperty('homeless', 'circle-radius');

            console.log(pp);
            pp.property = "HL" + years[year]; // update the pp circle-radius to the new column set by the user

            afterMap.setPaintProperty('homeless', 'circle-radius', pp);

            console.log(afterMap.getPaintProperty('homeless', 'circle-radius'));

            var yearcol = "HL" + String(years[year]);
            /*var textfield = "HL" + String(years[year]);*/

            console.log(textfield);

            afterMap.setLayoutProperty('labels', 'text-field',
                textfield); // update the labels layer to the new column
            var filters = ['>', yearcol, 30];
            afterMap.setFilter('labels', filters);
        }

        // Add the circle layer to the map

        beforeMap.addLayer({
            id: 'stock',
            type: 'circle',
            source: {
                type: 'vector',
                url: 'mapbox://lingweiz.5w0x3q89' // Your Mapbox tileset Map ID
            },
            'source-layer': 'centroid-5m5k66', // name of tileset layer
            'layout': {
                'visibility': 'visible'
            },
            paint: {
                'circle-color': '#67a9cf',
                'circle-opacity': 0.90,
                'circle-stroke-width': {
                    stops: [
                        [8, 0.5],
                        [13, 3],
                        [16, 4]
                    ] // The width properties change at different zoom levels, getting thicker
                },
                'circle-stroke-color': '#000000',
                'circle-stroke-opacity': 0,
                'circle-radius': {
                    property: 'ST2004',
                    stops: [ // The circle radius varies according to the zoom level and the number of passengers
                        [{
                            zoom: 5,
                            value: 5000
                        }, 0.5],
                        [{
                            zoom: 5,
                            value: 165000
                        }, 12],
                        [{
                            zoom: 7,
                            value: 5000
                        }, 1],
                        [{
                            zoom: 7,
                            value: 165000
                        }, 24],
                        [{
                            zoom: 9,
                            value: 5000
                        }, 2],
                        [{
                            zoom: 9,
                            value: 165000
                        }, 48],
                        [{
                            zoom: 12,
                            value: 5000
                        }, 5],
                        [{
                            zoom: 12,
                            value: 165000
                        }, 96]

                    ]
                }
            }
        });


        beforeMap.addLayer({
            id: 'vacant',
            type: 'circle',
            source: {
                type: 'vector',
                url: 'mapbox://lingweiz.5w0x3q89' // Your Mapbox tileset Map ID
            },
            'source-layer': 'centroid-5m5k66', // name of tileset layer
            'layout': {
                'visibility': 'visible'
            },
            paint: {
                'circle-color': '#67a9cf',
                'circle-opacity': 0,
                'circle-stroke-width': {
                    stops: [
                        [8, 0.5],
                        [13, 3],
                        [16, 4]
                    ] // The width properties change at different zoom levels, getting thicker
                },
                'circle-stroke-color': '#ffffff',
                'circle-stroke-opacity': 0,
                'circle-radius': {
                    property: 'VC2004',
                    stops: [ // The circle radius varies according to the zoom level and the number of passengers
                        [{
                            zoom: 5,
                            value: 0
                        }, 0.5],
                        [{
                            zoom: 5,
                            value: 6400
                        }, 12],
                        [{
                            zoom: 7,
                            value: 0
                        }, 1],
                        [{
                            zoom: 7,
                            value: 6400
                        }, 24],
                        [{
                            zoom: 9,
                            value: 0
                        }, 2],
                        [{
                            zoom: 9,
                            value: 6400
                        }, 48],
                        [{
                            zoom: 12,
                            value: 0
                        }, 5],
                        [{
                            zoom: 12,
                            value: 6400
                        }, 96]
                    ]
                }
            }
        });

        afterMap.addLayer({
            id: 'homeless',
            type: 'circle',
            source: {
                type: 'vector',
                url: 'mapbox://lingweiz.5w0x3q89' // Your Mapbox tileset Map ID
            },
            'source-layer': 'centroid-5m5k66', // name of tileset layer
            'layout': {
                'visibility': 'visible'
            },
            paint: {
                'circle-color': '#fe9929',
                'circle-opacity': 0.90,
                'circle-stroke-width': {
                    stops: [
                        [8, 0.5],
                        [13, 3],
                        [16, 4]
                    ] // The width properties change at different zoom levels, getting thicker
                },
                'circle-stroke-color': '#ffffff',
                'circle-stroke-opacity': 0,
                'circle-radius': {
                    property: 'HL2004',
                    stops: [ // The circle radius varies according to the zoom level and the number of passengers
                        [{
                            zoom: 5,
                            value: 0
                        }, 0.5],
                        [{
                            zoom: 5,
                            value: 1700
                        }, 12],
                        [{
                            zoom: 7,
                            value: 0
                        }, 1],
                        [{
                            zoom: 7,
                            value: 1700
                        }, 24],
                        [{
                            zoom: 9,
                            value: 0
                        }, 2],
                        [{
                            zoom: 9,
                            value: 1700
                        }, 48],
                        [{
                            zoom: 12,
                            value: 0
                        }, 5],
                        [{
                            zoom: 12,
                            value: 1700
                        }, 96]
                    ]
                }
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
        document.getElementById('slider').addEventListener('input', function (e) {
            var year = parseInt(e.target.value);
            setYear2(year);
        });

        var mypopup = new mapboxgl.Popup({
            offset: [150, 50],
            closeButton: false
        });
        // Another event listener that adds the popup when the user puts their cursor over the tube circles
        beforeMap.on('mouseover', 'stock', function (e) {
            mypopup
                .setLngLat(e.features[0].geometry.coordinates)
                .setHTML(
                    "<h1>" + e.features[0].properties.lad15nm +
                    "</h1><h5>Stock:</h5>  " + "2004:   " + e.features[0].properties.ST2004 +
                    "<br />2019:   " + e.features[0].properties.ST2019 +
                    "<br /><h5>Vacant:</h5>  " + "2004:  " + e.features[0].properties.VC2004 +
                    "<br />2019:  " + e.features[0].properties.VC2019 +
                    "<br /><h5>Homeless People:</h5>  " + "2004:  " + e.features[0].properties.HL2004 +
                    "<br />2019:  " + e.features[0].properties.HL2019
                )
                .addTo(beforeMap);
        });

        // Change the cursor to a pointer when the mouse is over the stations layer.
        beforeMap.on('mouseenter', 'stock', function () {
            beforeMap.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves and remove the popup window.
        beforeMap.on('mouseleave', 'stock', function () {
            beforeMap.getCanvas().style.cursor = '';
            mypopup.remove();
        });




        var mypopup1 = new mapboxgl.Popup({
            offset: [150, 50],
            closeButton: false
        });
        // Another event listener that adds the popup when the user puts their cursor over the tube circles
        afterMap.on('mouseover', 'stock', function (e) {
            mypopup1
                .setLngLat(e.features[0].geometry.coordinates)
                .setHTML(
                    "<h1>" + e.features[0].properties.lad15nm +
                    "</h1><h5>Stock:</h5>  " + "2004:   " + e.features[0].properties.ST2004 +
                    "<br />2019:   " + e.features[0].properties.ST2019 +
                    "<br /><h5>Vacant:</h5>  " + "2004:  " + e.features[0].properties.VC2004 +
                    "<br />2019:  " + e.features[0].properties.VC2019 +
                    "<br /><h5>Homeless People:</h5>  " + "2004:  " + e.features[0].properties.HL2004 +
                    "<br />2019:  " + e.features[0].properties.HL2019
                )
                .addTo(beforeMap);
        });

        // Change the cursor to a pointer when the mouse is over the stations layer.
        afterMap.on('mouseenter', 'stock', function () {
            beforeMap.getCanvas().style.cursor = 'pointer';
        });

        // Change it back to a pointer when it leaves and remove the popup window.
        afterMap.on('mouseleave', 'stock', function () {
            afterMap.getCanvas().style.cursor = '';
            beforeMap.remove();
        });






        //Event listener for layer switch
        document.getElementById("layer1").addEventListener("click", function () {
            beforeMap.setPaintProperty('stock', 'circle-opacity', 0.95);
            beforeMap.setPaintProperty('vacant', 'circle-opacity', 0);
        });

        document.getElementById("layer2").addEventListener("click", function () {
            beforeMap.setPaintProperty('stock', 'circle-opacity', 0);
            beforeMap.setPaintProperty('vacant', 'circle-opacity', 0.95);
        });


        var dom = document.getElementById("container");
        var myChart = echarts.init(dom,'dark');
        var app = {};
        var option;



        setTimeout(function () {

            option = {
                legend: {},
                tooltip: {
                    trigger: 'axis',
                    showContent: false
                },
                dataset: {
                    source: [
                        ['product', '2005', '2007', '2009', '2011', '2013', '2015', '2017', '2019'],
                        ['White', 8090, 5340, 3530, 4260, 5770, 6150, 4720, 3930],
                        ['Black', 6610, 4310, 2990, 4420, 5630, 6320, 4610, 4260],
                        ['Asian', 2350, 1590, 1070, 1360, 2280, 2800, 2400, 1610],
                        ['Mixed', 0, 0, 450, 520, 730, 900, 840, 690],
                        ['Others', 2510, 1600, 770, 1260, 1190, 1490, 1120, 1170],
                        ['Not Stated', 1070, 970, 650, 910, 1430, 1510, 1780, 1370]
                    ]
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    gridIndex: 0
                },
                grid: {
                    top: '50%',
                },
                series: [{
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                    {
                        type: 'line',
                        smooth: true,
                        seriesLayoutBy: 'row',
                        emphasis: {
                            focus: 'series'
                        }
                    },
                    {
                        type: 'pie',
                        id: 'pie',
                        radius: '30%',
                        center: ['50%', '30%'],
                        emphasis: {
                            focus: 'data'
                        },
                        label: {
                            formatter: '{b}: {@2004} ({d}%)'
                        },
                        encode: {
                            itemName: 'product',
                            value: '2004',
                            tooltip: '2004'
                        }
                    }
                ]
            };

            myChart.on('updateAxisPointer', function (event) {
                var xAxisInfo = event.axesInfo[0];
                if (xAxisInfo) {
                    var dimension = xAxisInfo.value + 1;
                    myChart.setOption({
                        series: {
                            id: 'pie',
                            label: {
                                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                            },
                            encode: {
                                value: dimension,
                                tooltip: dimension
                            }
                        }
                    });
                }
            });

            myChart.setOption(option);

        });

        if (option && typeof option === 'object') {
            myChart.setOption(option);
        }


        var chartDom = document.getElementById('container1');
        var myChart1 = echarts.init(chartDom,'dark');
        var option1;

        var data = [
            ["2004", 3158],
            ["2005", 3184],
            ["2006", 3213],
            ["2007", 3244],
            ["2008", 3276],
            ["2009", 3308],
            ["2010", 3336],
            ["2011", 3358],
            ["2012", 3383],
            ["2013", 3404],
            ["2014", 3428],
            ["2015", 3454],
            ["2016", 3485],
            ["2017", 3524],
            ["2018", 3556],
            ["2019", 3592]

        ];
        var data1 = [
            ["2004", 8.6733],
            ["2005", 8.5571],
            ["2006", 8.6701],
            ["2007", 8.4627],
            ["2008", 8.4126],
            ["2009", 8.5062],
            ["2010", 7.9971],
            ["2011", 7.4310],
            ["2012", 7.2101],
            ["2013", 5.9313],
            ["2014", 5.6715],
            ["2015", 5.9881],
            ["2016", 5.8096],
            ["2017", 6.2366],
            ["2018", 6.7055],
            ["2019", 7.1666],
            ["2020", 8.0295]

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
                min: 3000,
                max: 4000
            }, {
                show: false,
                type: 'continuous',
                seriesIndex: 1,
                dimension: 0,
                min: 0,
                max: dateList1.length - 1
            }],


            title: [{
                left: 'center',
                text: 'Total Stock Change (Thousands of)'
            }, {
                top: '50%',
                left: 'center',
                text: 'Total Vacant Change (Thousands of)'
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
                min: 3000
            }, {min: 5,
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