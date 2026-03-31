// ------------------------
// Base map and main map
// ------------------------
var mymap = L.map("map", {
  center: [28.972443641658437, 84.59443216376953],
  zoom: 8
    //-- layers: streets ...and a comma above, might need? makes basemap go blank --//
});

var Esri_WorldTopoMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});
 
// Base tile layer
var grey = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
  subdomains: 'abcd',
  maxZoom: 20
}).addTo(mymap);

// Mini map
var miniLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: 0,
  maxZoom: 13,
  attribution: '&copy; OpenStreetMap'
});

var miniMap = new L.Control.MiniMap(miniLayer, {
  toggleDisplay: true,
  minimized: false,
  position: "bottomleft"
}).addTo(mymap);

//--Icon import/creation --//

var myIcon = L.icon({
    iconUrl: 'images/peaks.png',
    iconSize: [20, 20],
    iconAnchor: [10, 15],
    popupAnchor: [1, -24],
});

//-- Variable for Peaks --//
var peaks = new L.geoJson(mtn_peaks, {
  onEachFeature: function(feature, featureLayer) {
    featureLayer.bindPopup(
        '<p>Peak Name: <b>' + feature.properties.TITLE + '</b><br>' +
        'Peak Height: ' + feature.properties.TITLE + ' m</br>' +
        'Number of Deaths: ' + feature.properties.number_of_ + '</br>' +
        'Number of Expeditions: ' + feature.properties.number_of1 + '</p>'
    
    );
  },
  pointToLayer: function(feature, latlng) {
    return L.marker (latlng, {icon: myIcon});
  }
}).addTo(mymap);