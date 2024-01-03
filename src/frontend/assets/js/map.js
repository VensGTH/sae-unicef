window.addEventListener('DOMContentLoaded', () => {
    const locs = [
        [[48.8425494, -1.5894713], 'UNICEF Antenne de Normandie Sud-Manche', '<b>UNICEF</b><br>Antenne de Normandie Sud-Manche', '1tr1'],
        [[48.611, 0.317], 'UNICEF Orne', '<b>UNICEF</b><br>Orne', '1tr3'],
        [[49.4414571, 1.0955183], 'UNICEF Seine-Martitime', '<b>UNICEF</b><br>Seine-Martitime', '1tr2'],
        [[49.0268903, 1.1510164], "UNICEF Antenne de l'Eure", '<b>UNICEF</b><br>Eure', '1tr3'],
        [[49.1927412, -0.3647902], 'UNICEF Calvados', '<b>UNICEF</b><br>Calvados', '1tr4']
    ];

    const tiles = ['https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'];
    var map = L.map('map', {
        maxZoom: 8,
        minZoom: 7,
        zoomControl: false
    });
    map.setView([49.1927412, -0.3647902], 8);
    L.control.zoom({ position: 'topright' }).addTo(map);
    var geojson;
    var greenIcon = L.icon({
        iconUrl: './assets/images/marker-marker04.png',

        iconSize: [50, 40], // size of the icon
        iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
        /*popupAnchor:  [-3, -76]*/ // point from which the popup should open relative to the iconAnchor
    });

    $.getJSON('/assets/geojson.min.json').then(function (geoJSON) {
        L.tileLayer(tiles[0], {
            maxZoom: 8,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="http://carto.com">CARTO</a>'
        }).addTo(map);
        geojson = L.geoJSON(geoJSON, {
            onEachFeature: onEachFeature,
            style: style
        }).addTo(map);
    });
    for (let i = 0; i < locs.length; i++) {
        L.marker(locs[i][0], {
            draggable: false,
            title: locs[i][1]
            /*icon: greenIcon*/
            /*opacity: 0.5*/
        })
            .addTo(map)
            .bindPopup(locs[i][2])
            .on('mouseover', () => {
                let el1 = document.querySelector(`[data-post_id="${locs[i][3]}"]`);
                let img = el1.getElementsByTagName('img')[0];
                img.style.opacity = '0.5';
            })
            .on('mouseout', () => {
                let el1 = document.querySelector(`[data-post_id="${locs[i][3]}"]`);
                let img = el1.getElementsByTagName('img')[0];
                img.style.opacity = 1;
            })
            .on('mouseclick', () => {
                let el1 = document.querySelector(`[data-post_id="${locs[i][3]}"]`);
                let img = el1.getElementsByTagName('img')[0];
                img.style.opacity = 1;
            });
        //.openPopup()
    }

    function getColor(d) {
        let clr = {
            14: '#800026',
            27: '#E31A1C',
            50: '#FC4E2A',
            61: '#FEB24C',
            76: '#FFEDA0'
        };

        clr = {
            14: '#ff6663',
            27: '#E0FF4F',
            50: '#083D77',
            61: '#DA4167',
            76: '#093824'
        };
        return clr[d];
    }

    function style(feature) {
        return {
            fillColor: getColor(feature.properties.code),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    function highlightFeature(e) {
        //console.log(e);
        let layer = e.target;

        layer.setStyle({
            weight: 3,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.5
        });

        layer.bringToFront();
        layer.bindPopup('<b>This is : </b>' + layer.feature.properties.nom);
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }
    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function showRelated(e) {
        let layer = e.target;
        let code = layer.feature.properties.code;
        let id = document.querySelector(`[class="ville-amies__container2"][data-id="${code}"]`);
        if (id) {
            let act = document.getElementsByClassName('ville-amies__container2 active')[0];
            act.classList.remove('active');
            id.classList.add('active');
        }
    }
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: (e) => {
                zoomToFeature(e), showRelated(e);
            }
        });
    }
});
