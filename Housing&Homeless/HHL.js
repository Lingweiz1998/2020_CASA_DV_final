mapboxgl.accessToken =
    'pk.eyJ1IjoibGluZ3dlaXoiLCJhIjoiY2trNWFsNzRvMG9pajJ3cW5udHpjaGlldyJ9._WoXMc4ffb6xIBNNl764Kw';
var beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'mapbox://styles/lingweiz/ckm614gx12zvz17nwit56cbne',
    center: [-0.125, 51.515],
    zoom: 10
});

var afterMap = new mapboxgl.Map({
    container: 'after',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [-0.125, 51.515],
    zoom: 10
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
                'circle-color': '#ff8585',
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
                        }, 4],
                        [{
                            zoom: 7,
                            value: 5000
                        }, 1],
                        [{
                            zoom: 7,
                            value: 165000
                        }, 13],
                        [{
                            zoom: 9,
                            value: 5000
                        }, 2],
                        [{ 
                            zoom: 9,
                            value: 165000
                        }, 50],
                        [{
                            zoom: 12,
                            value: 5000
                        }, 5],
                        [{
                            zoom: 12,
                            value: 165000
                        }, 100]

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
                'circle-color': '#ff8585',
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
                        }, 4],
                        [{
                            zoom: 7,
                            value: 0
                        }, 1],
                        [{
                            zoom: 7,
                            value: 6400
                        }, 13],
                        [{
                            zoom: 9,
                            value: 0
                        }, 2],
                        [{
                            zoom: 9,
                            value: 6400
                        }, 50],
                        [{
                            zoom: 12,
                            value: 0
                        }, 5],
                        [{
                            zoom: 12,
                            value: 6400
                        }, 100]                ]
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
                'circle-color': '#ff8585',
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
                        }, 4],
                        [{
                            zoom: 7,
                            value: 0
                        }, 1],
                        [{
                            zoom: 7,
                            value: 1700
                        }, 13],
                        [{
                            zoom: 9,
                            value: 0
                        }, 2],
                        [{
                            zoom: 9,
                            value: 1700
                        }, 50],
                        [{
                            zoom: 12,
                            value: 0
                        }, 5],
                        [{
                            zoom: 12,
                            value: 1700
                        }, 100]
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

        //Event listener for layer switch
        document.getElementById("layer1").addEventListener("click", function () {
            beforeMap.setPaintProperty('stock', 'circle-opacity', 0.95);
            beforeMap.setPaintProperty('vacant', 'circle-opacity', 0);
        });

        document.getElementById("layer2").addEventListener("click", function () {
            beforeMap.setPaintProperty('stock', 'circle-opacity', 0);
            beforeMap.setPaintProperty('vacant', 'circle-opacity', 0.95);
        });


    });