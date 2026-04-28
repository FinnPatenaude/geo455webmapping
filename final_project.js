// ------------------------
// Base map and main map
// ------------------------

var mymap = L.map("map", {
  center: [43.718490, -91.249710],
  zoom: 9
});

var legend = L.control({ position: "topright" });

legend.onAdd = function (map) {

  var div = L.DomUtil.create("div", "info legend");

  div.innerHTML = `
    <h6><b>Legend</b></h6>

    <i style="background: red; width:12px; height:12px; display:inline-block;"></i>
    High bird density<br>

    <i style="background: orange; width:12px; height:12px; display:inline-block;"></i>
    Medium density<br>

    <i style="background: yellow; width:12px; height:12px; display:inline-block;"></i>
    Low density<br>

    <img src="imagesFP/4874bc2389e71df4c479ad933b12226a.svg" width="18">
    Park locations
  `;

  return div;
};

document.getElementById("heatmap-legend").innerHTML = `
  <div class="p-2 border rounded bg-white shadow-sm">

    <h6><b>Map Legend</b></h6>

    <div>
      <span style="background:red;width:12px;height:12px;display:inline-block;border-radius:50%;"></span>
      High Sighting Density
    </div>

    <div>
      <span style="background:orange;width:12px;height:12px;display:inline-block;border-radius:50%;"></span>
      Medium Sighting Density
    </div>

    <div>
      <span style="background:yellow;width:12px;height:12px;display:inline-block;border-radius:50%;"></span>
      Low Sighting Density
    </div>

    <div class="mt-2">
      <img src="imagesFP/4874bc2389e71df4c479ad933b12226a.svg" width="18">
      Park/Trail/Overlook Locations
    </div>

  </div>
`;


var Esri_WorldTopoMap = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
  }
);

// Base tile layer
var grey = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 20
  }
);

Esri_WorldTopoMap.addTo(mymap);

// ------------------------
// Mini Map
// ------------------------

var miniLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    minZoom: 0,
    maxZoom: 13,
    attribution: '&copy; OpenStreetMap'
  }
);

var miniMap = new L.Control.MiniMap(miniLayer, {
  toggleDisplay: true,
  minimized: false,
  position: "bottomleft"
}).addTo(mymap);

// ------------------------
// Icon
// ------------------------

var myIcon = L.icon({
  iconUrl: 'imagesFP/4874bc2389e71df4c479ad933b12226a.svg',
  iconSize: [30, 30],
  iconAnchor: [10, 15],
  popupAnchor: [1, -24],
});

// ------------------------
// Parks / Trails Layer
// ------------------------

var trail_spots = new L.geoJson(great_trail_spots, {
  onEachFeature: function (feature, featureLayer) {
    featureLayer.bindPopup(
      '<p><b>' + feature.properties.TITLE + '</b><br>' +
      'City/Town: ' + feature.properties.City + '<br>' +
      'Details: ' + feature.properties.details + '<br>' +
      'County: ' + feature.properties.county + '</p>' +
      '<img src="' + feature.properties.image + '" style="width:200px;">'
    );
    
    featureLayer.featureTitle = feature.properties.TITLE;
  },
  
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: myIcon });
  }
}).addTo(mymap);

// ------------------------
// Home Button
// ------------------------

var homeCenter = mymap.getCenter();
var homeZoom = mymap.getZoom();

L.easyButton('<img src="Home_icon_blackFP.png" style="height:70%;">', function () {
  mymap.setView(homeCenter, homeZoom);
}, "Original View").addTo(mymap);

L.easyButton('<img src="imagesFP/info_icon.png" style="width:20px;height:20px;">', function () {
  window.location.href = "finalprojectinfo.html";
}, "Info Page").addTo(mymap);

// ------------------------
// Heat Map
// ------------------------

function createHeatMap(data) {

  var heatMapPoints = [];

  data.features.forEach(function (feature) {
    var coords = feature.geometry.coordinates;

    var lat = coords[1];
    var lng = coords[0];

    heatMapPoints.push([lat, lng, 1]);
  });

  return L.heatLayer(heatMapPoints, {
    radius: 25,
    minOpacity: 0.25,
    gradient: { 0.5: 'yellow', 0.75: 'orange', 1: 'red' }
  });

}

var eagleHeat;
var robinHeat;
var heronHeat;

Promise.all([
  fetch('baldeagles.geojson').then(res => res.json()),
  fetch('americanrobins.geojson').then(res => res.json()),
  fetch('greatblueherons.geojson').then(res => res.json())
]).then(([eagleData, robinData, heronData]) => {

  eagleHeat = createHeatMap(eagleData);
  robinHeat = createHeatMap(robinData);
  heronHeat = createHeatMap(heronData);

  // Add one by default (optional)
  eagleHeat.addTo(mymap);


    // ------------------------
    // Layer Control
    // ------------------------

    var baseMaps = {
      "Topographic": Esri_WorldTopoMap,
      "Grayscale": grey
    };

    var overlays = {
      "Park Locations": trail_spots,
      "Bald Eagle": eagleHeat,
      "American Robin": robinHeat,
      "Great Blue Heron": heronHeat,
    };

    L.control.layers(baseMaps, overlays, {
      collapsed: false
    }).addTo(mymap);
  });

// ------------------------
// Search Control
// ------------------------

var searchControl = new L.Control.Search({
  position: 'topright',
  layer: trail_spots,
  propertyName: 'TITLE',
  marker: false,
  markeranimate: true,
  delayType: 100,
  collapsed: false,
  textPlaceholder: 'Search by Park Name',
  
 moveToLocation: function(latlng, title, map) {
    map.flyTo(latlng, 15, {
      duration: 1.2
    });
  }
});

mymap.addControl(searchControl);

mymap.on('search:locationfound', function(e) {

  mymap.flyTo(e.latlng, 15, {
    duration: 1.2
    
  });

  trail_spots.eachLayer(function(layer) {

    if (layer.feature &&
        layer.feature.properties &&
        layer.feature.properties.TITLE === e.text) {

      layer.openPopup();
    }
  });

});