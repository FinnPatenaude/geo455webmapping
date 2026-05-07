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
    
    <i style="background: gray; width: 12px; height:4pxdisplay:inline-block;"></i>
    Scenic Byways<br>
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

    <div>
      <span style="background:brown;width:12px;height:4px;display:inline-block;border-radius:50%;"></span>
      Trails
    </div>

    <div>
      <span style="background:gray;width:12px;height:4px;display:inline-block;border-radius:50%;"></span>
      Scenic Byways
    </div>

  </div>
`;

// Streetmap Basemap
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

//Satellite imagery Basemap
var Esri_WorldImagery = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and others'
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

var bikeTrails;

fetch('biketrails.geojson')
  .then(res => res.json())
  .then(data => {

    bikeTrails = L.geoJson(data, {

      style: function(feature) {
        return {
          color: '#ac750e',   // green
          weight: 4
        };
      },

      onEachFeature: function(feature, layer) {
        layer.bindPopup(
          '<p><b>' + "(Bike Trail) Great River Trail + La Crosse River Trail + Elroy Sparta Trail + 400 State Trail" + '</b><br>'
        );
      }

    }).addTo(mymap);

  });

var scenicByways;

fetch('scenicbyways.geojson')
  .then(res => res.json())
  .then(data => {

    scenicByways = L.geoJson(data, {

      style: function(feature) {
        return {
          color: '#888888',   // green
          weight: 4
        };
      },

      onEachFeature: function(feature, layer) {
        layer.bindPopup(
          '<p><b>' + "(Road) Great River Road + Lower Wisconsin River Road" + '</b><br>'
        );
      }

    }).addTo(mymap);

  });

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
var bluejayHeat;
var grnheronHeat;
var cardinalHeat;

Promise.all([
  fetch('baldeagles.geojson').then(res => res.json()),
  fetch('americanrobins.geojson').then(res => res.json()),
  fetch('greatblueherons.geojson').then(res => res.json()),
  fetch('bluejay.geojson').then(res => res.json()),
  fetch('greenheron.geojson').then(res => res.json()),
  fetch('northerncardinal.geojson').then(res => res.json())
]).then(([eagleData, robinData, heronData, bluejayData, grnheronData, cardinalData]) => {

  eagleHeat = createHeatMap(eagleData);
  robinHeat = createHeatMap(robinData);
  heronHeat = createHeatMap(heronData);
  bluejayHeat = createHeatMap(bluejayData);
  grnheronHeat = createHeatMap(grnheronData);
  cardinalHeat = createHeatMap(cardinalData);

  // Add one by default (optional)
  eagleHeat.addTo(mymap);


    // ------------------------
    // Layer Control
    // ------------------------

    var baseMaps = {
      "Topographic": Esri_WorldTopoMap,
      "Grayscale": grey,
      "Satellite Imagery": Esri_WorldImagery
    };

    var overlays = {
      "Park Locations": trail_spots,
      "Trails": bikeTrails,
      "Scenic Byways": scenicByways,
    };
  
    var heatmaps = {
      "Bald Eagle": eagleHeat,
      "American Robin": robinHeat,
      "Great Blue Heron": heronHeat,
      "Bluejay": bluejayHeat,
      "Green Heron": grnheronHeat,
      "Northern Cardinal": cardinalHeat,
    };

    L.control.layers(baseMaps, overlays, {
      collapsed: false
    }).addTo(mymap);
  });


// Heat Map Species Grid

function toggleHeat(type) {
  const maps = {
    eagle: eagleHeat,
    robin: robinHeat,
    heron: heronHeat,
    bluejay: bluejayHeat,
    grnheron: grnheronHeat,
    cardinal: cardinalHeat,
  };

  // remove all heat layers
  Object.values(maps).forEach(layer => {
    if (mymap.hasLayer(layer)) mymap.removeLayer(layer);
  });

  // add selected
  mymap.addLayer(maps[type]);

  updateActiveTile(type);
  updateSpeciesInfo(type);
}
 
function updateActiveTile(type) {
  document.querySelectorAll('.heat-item')
    .forEach(el => el.classList.remove('active'));

  const order = ['eagle', 'robin', 'heron', 'bluejay','grnheron','cardinal'];
  const index = order.indexOf(type);

  if (index !== -1) {
    document.querySelectorAll('.heat-item')[index]
      .classList.add('active');
  }
}

function clearHeat() {
  [eagleHeat, robinHeat, heronHeat, grnheronHeat, bluejayHeat, cardinalHeat].forEach(layer => {
    if (mymap.hasLayer(layer)) mymap.removeLayer(layer);
  });

  document.querySelectorAll('.heat-item')
    .forEach(el => el.classList.remove('active'));
}

// Species Information

const speciesInfo = {
  eagle: {
    title: "Bald Eagle",
    text: "Large raptor commonly found near lakes and rivers. Known for fish hunting and nesting in tall trees."
  },
  robin: {
    title: "American Robin",
    text: "Common songbird in Wisconsin. Often seen hopping on lawns searching for worms."
  },
  heron: {
    title: "Great Blue Heron",
    text: "Tall wading bird found near wetlands. Hunts fish in shallow water."
  },
  bluejay: {
    title: "Bluejay",
    text: "Large crested songbird with broad, rounded tail. Often around urban areas or trails."
  },
  grnheron: {
    title: "Green Heron",
    text: "Short and stocky heron often seen on riverbanks and near water looking for fish."
  },
  cardinal: {
    title: "Northern Cardinal",
    text: "Small perching songbird. Males are bright red, while females are brown with a touch of red."
  }
};

function updateSpeciesInfo(type) {
  const box = document.getElementById("species-info");

  const data = speciesInfo[type];

  box.innerHTML = `
    <h6>${data.title}</h6>
    <p>${data.text}</p>
  `;
}

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