mapboxgl.accessToken =
    'pk.eyJ1IjoibGluZ3dlaXoiLCJhIjoiY2trNWFsNzRvMG9pajJ3cW5udHpjaGlldyJ9._WoXMc4ffb6xIBNNl764Kw';
var beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'mapbox://styles/mapbox/light-v10',
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

// Set default parameters of map-loading function
var layerField = 'ST2004';

beforeMap.on('load', function () {
    // Set global light properties which influence 3D layer shadows
    beforeMap.setLight({
        color: "#fff",
        intensity: 0.15,
        position: [1.15, 210, 30]
    });
    // Add standard navigation control
    beforeMap.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Load the 3D employment hexagon layer as a fill type
    beforeMap.addLayer({
        id: 'buildings',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://lingweiz.a18nxry8' // Your Mapbox tileset Map ID
        },
        'source-layer': 'final-2g64jr', // name of tileset
        paint: {
            'fill-color': '#919191',
            'fill-opacity': 1,
        }
    });
    beforeMap.addLayer({
        id: 'airQuality',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://lingweiz.a18nxry8' //  Mapbox tileset Map ID
        },
        'source-layer': 'final-2g64jr', // name of tileset
        paint: {
            'fill-color': {
                property: layerField,
                type: 'exponential',
                stops: [
                    [0, '#32e458'],
                    [10, '#32e458'],
                    [30, '#eab71f'],
                    [40, '#e55720'],
                    [80, '#bf1c1c'],
                    [100, '#800d2d'],
                    [800, '#441038']
                ]
            },
            'fill-opacity': 0.8,
        }
    });

    var layerList = document.getElementsByClassName("collapsible");
    var yearList = document.getElementsByClassName("radiobutton");

    var buttonID = 'ST';

    for (let i = 0; i < layerList.length; i++) {
        var radioID;
        if (document.getElementById('2004').checked) {
            radioID = '2004';
        } else if (document.getElementById('2009').checked) {
            radioID = '2009';
        } else if (document.getElementById('2014').checked) {
            radioID = '2014';
        } else {
            radioID = '2019';
        }

        layerList[i].addEventListener('click', function (e) {
            buttonID = e.target.id;

            //define layer id by name
            layerField = buttonID + radioID.substring(2);
            layerField = layerField.replace(/\s/g, '');

            var paintDesign = {
                property: layerField,
                type: 'exponential',
                stops: [
                    [0, '#32e458'],
                    [10, '#32e458'],
                    [30, '#eab71f'],
                    [40, '#e55720'],
                    [80, '#bf1c1c'],
                    [100, '#800d2d'],
                    [800, '#441038']
                ]
            };

            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                for (let z = 0; z < layerList.length; z++) {
                    let hidecontent = layerList[z].nextElementSibling;
                    hidecontent.style.display = "none";
                }
                content.style.display = "block";
            }

            map.setPaintProperty('airQuality', 'fill-color', paintDesign);
        })
    }

    for (let i = 0; i < yearList.length; i++) {

        yearList[i].addEventListener('click', function (e) {
            let radioID = e.target.id;

            layerField = buttonID + radioID.substring(2);
            layerField = layerField.replace(/\s/g, '');
            var paintDesign = {
                property: layerField,
                type: 'exponential',
                stops: [
                    [0, '#32e458'],
                    [10, '#32e458'],
                    [30, '#eab71f'],
                    [40, '#e55720'],
                    [80, '#bf1c1c'],
                    [100, '#800d2d'],
                    [800, '#441038']
                ]
            };

            map.setPaintProperty('airQuality', 'fill-color', paintDesign);
        })
    }
});