// ------------------------
// Base map and main map
// ------------------------
var mymap = L.map("map", {
  center: [43.718490, -91.249710],
  zoom: 9
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
    iconUrl: 'images/4874bc2389e71df4c479ad933b12226a.svg',
    iconSize: [30, 30],
    iconAnchor: [10, 15],
    popupAnchor: [1, -24],
});

//-- Variable for Peaks --//
var trail_spots = new L.geoJson(great_trail_spots, {
  onEachFeature: function(feature, featureLayer) {
    featureLayer.bindPopup(
        '<p>Park Name: <b>' + feature.properties.TITLE + '</b><br>' +
        'City/Town: ' + feature.properties.City + ' </br>' +
        'Park Details: ' + feature.properties.details + '</br>' +
        'County: ' + feature.properties.county + '</p>'
    
    );
  },
  pointToLayer: function(feature, latlng) {
    return L.marker (latlng, {icon: myIcon});
  }
}).addTo(mymap);

var homeCenter = mymap.getCenter(); // this is extracting the original map center and saving it in the variable

var homeZoom = mymap.getZoom(); // this is extracting the original zoom and saving it in the variable

L.easyButton(('<img src="Home_icon_blackFP.png", height=70%>'), function () {
  mymap.setView(homeCenter, homeZoom);
}, "Home").addTo(mymap);

//-- search box --//

var searchControl = new L.Control.Search({
    position:'topright',
    layer: trail_spots,
    propertyName: 'TITLE',
    marker: false,
    markeranimate: true,
    delayType: 100,
    collapsed: false,
    textPlaceholder: 'Search by Park/Bird Name: e.g. Houska Park, Robin',   
    moveToLocation: function(latlng, title, map) {
        mymap.setView(latlng, 15);}
});

mymap.addControl(searchControl); 

//-- layer control menu --//

var baseMaps = {
  "Topographic": Esri_WorldTopoMap,
};
    
var overlays = {
  "Park Locations": trail_spots,
};

L.control.layers(baseMaps, overlays, {collapsed: false }).addTo(mymap);
