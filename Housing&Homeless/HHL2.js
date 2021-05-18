mapboxgl.accessToken =
    'pk.eyJ1IjoibGluZ3dlaXoiLCJhIjoiY2trNWFsNzRvMG9pajJ3cW5udHpjaGlldyJ9._WoXMc4ffb6xIBNNl764Kw';
var beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'mapbox://styles/lingweiz/ckol4p2n21bzq17l3aciuyfpu',
    center: [-0.125, 51.515],
    zoom: 10
});

var afterMap = new mapboxgl.Map({
    container: 'after',
    style: 'mapbox://styles/lingweiz/ckm1s6opnahsr17ljtnyztrma',
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

            var pp = beforeMap.getPaintProperty('stock', 'fill-color');

            console.log(pp);
            pp.property = "DST" + years[year]; // update the pp circle-radius to the new column set by the user

            beforeMap.setPaintProperty('stock', 'fill-color', pp);

            console.log(beforeMap.getPaintProperty('stock', 'fill-color'));
            var yearcol = "DST" + String(years[year]);
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

        beforeMap.addSource('HHL', {
            'type': 'vector',
            'url': 'mapbox://lingweiz.1vddfs47'
        });


        // Add the circle layer to the map

        beforeMap.addLayer({
            id: 'stock',
            source: 'HHL',
            'source-layer': 'choro-cy6r1g', // name of tileset layer
            type: 'fill',
            paint: {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', year],
                    0.5,
                    '#F2F12D',
                    2,
                    '#EED322',
                    3.5,
                    '#E6B71E',
                    5,
                    '#DA9C20',
                    6.5,
                    '#CA8323',
                    8,
                    '#B86B25'
                ],
                'fill-opacity': 0.75
            },
            filter: ["all", setYear(year)]
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

        //Event listener for layer switch
        document.getElementById("layer1").addEventListener("click", function () {
            beforeMap.setPaintProperty('stock', 'fill-opacity', 0.95);
            beforeMap.setPaintProperty('vacant', 'fill-opacity', 0);
        });

        document.getElementById("layer2").addEventListener("click", function () {
            beforeMap.setPaintProperty('stock', 'fill-opacity', 0);
            beforeMap.setPaintProperty('vacant', 'fill-opacity', 0.95);
        });


    });