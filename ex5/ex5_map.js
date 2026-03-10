var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2NoYXVkaHVyaSIsImEiOiJjazBtcG5odG8wMDltM2JtcjdnYTgyanBnIn0.qwqjMomdrBMG36GQKXBlMw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
});

var imagery = L.tileLayer('http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
});



var map = L.map("map", {
  center: [6.794952075439587, 20.91148703911037],
  zoom: 2,
  layers: [streets, imagery]
});

var homeCenter = map.getCenter(); // this is extracting the original map center and saving it in the variable

var homeZoom = map.getZoom(); // this is extracting the original zoom and saving it in the variable

L.easyButton(('<img src="Home_icon_black.png", height=70%>'), function () {
  map.setView(homeCenter, homeZoom);
}, "Home").addTo(map);

/*Create custom popups with images*/
var greatwallPopup = "Great Wall of China<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20090529_Great_Wall_8185.jpg/256px-20090529_Great_Wall_8185.jpg' alt='great wall wiki' width='150px'/>";

/* chichenPopup, petraPopup,  machuPopup, christPopup, coloPopup, tajPopup */

var chichenPopup = " Chichen-Itza<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Chichen_Itza_3.jpg/1920px-Chichen_Itza_3.jpg'alt='chichen-itza wiki' width='150px'/>";

var petraPopup = "Petra<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/The_Monastery%2C_Petra%2C_Jordan8.jpg/256px-The_Monastery%2C_Petra%2C_Jordan8.jpg'alt='petra wiki' width='150px'/>";

var machuPopup = "Machu Pichu<br/><img src= 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/256px-Machu_Picchu%2C_Peru.jpg'alt='machu pichu wiki' width='150px'/>";

var christPopup = "Christ the Redeemer<br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Aerial_view_of_the_Statue_of_Christ_the_Redeemer.jpg/256px-Aerial_view_of_the_Statue_of_Christ_the_Redeemer.jpg'alt='christ the redeemer wiki' width='150px'/>";

var coloPopup = "Colosseum <br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/256px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg'alt='colosseum wiki' width='150px'/>";

var tajPopup = "Taj Mahal <br/><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Taj-Mahal.jpg/256px-Taj-Mahal.jpg'alt='taj mahal wiki' width='150px'/>";

var customOptions ={'maxWidth': '150','className' : 'custom'};


/*LayerGroup and Data Array*/
var landmarks = L.layerGroup(); // in this code we initiated an empty layergroup.
landmarks.addTo(map); //add the new variable to the map now, when the data gets loaded it will be automatically populated.

var wonders = [
  { name: "Petra", coords: [30.3285, 35.4444], popupHtml: petraPopup },
  { name: "Colosseum", coords: [41.8902, 12.4922], popupHtml: coloPopup },
  { name: "Great Wall of China", coords: [40.4505, 116.5490], popupHtml: greatwallPopup },
  { name: "Chichen-Itza", coords: [20.6793, -88.5682], popupHtml: chichenPopup },
  { name: "Machu Pichu", coords: [-13.1629, -72.5450], popupHtml: machuPopup },
  { name: "Christ the Redeemer", coords: [-22.9517, -43.2104], popupHtml: christPopup },
  { name: "Taj Mahal", coords: [27.1753, 78.0421], popupHtml: tajPopup },
];

var iconFiles = [
  "images/icon_1.png",
  "images/icon_2.png",
  "images/icon_3.png",
  "images/icon_4.png",
  "images/icon_5.png",
  "images/icon_6.png",
  "images/icon_7.png",
];

function addWondersToLayer(dataArray, layerGroup, iconsArray) {
  var markers = [];
  
  for (var i = 0; i < dataArray.length; i++) {
    var feature = dataArray[i];
    
    var marker = L.marker(feature.coords, { icon: iconsArray[i] })
      .bindPopup(feature.popupHtml, customOptions)
      .bindTooltip(feature.name, { direction: "top", sticky: true, opacity: 0.9 })
      .addTo(layerGroup);
    
    markers.push(marker);
  }
  
  return markers;
}

var wonderIcons = [];
for (var i = 0; i < iconFiles.length; i++) {
  wonderIcons.push(
    L.icon({
      iconUrl: iconFiles[i],
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -28],
    })
  );
}

var wonderMarkers = addWondersToLayer(wonders, landmarks, wonderIcons);

var buttonsDiv = document.getElementById("wonder-buttons");
var wonderZoom = 6; // pick a zoom level you like

for (var i = 0; i < wonders.length; i++) {
  (function(index) {
    // Create a <button>
    var btn = document.createElement("button");
    btn.type = "button";

    // If using Bootstrap, use btn classes. If not, you can use your own CSS.
    btn.className = "btn btn-outline-secondary btn-sm text-start";

    // Use the SAME icon as the marker + show name
    btn.innerHTML =
      '<img src="' + iconFiles[index] + '" style="width:18px;height:18px;margin-right:8px;">' +
      wonders[index].name;

    // When clicked: zoom to the location + open popup
    btn.addEventListener("click", function() {
      map.setView(wonders[index].coords, wonderZoom);
      wonderMarkers[index].openPopup();
    });

    buttonsDiv.appendChild(btn);
  })(i);
}


/* Layer control and Menu Item */
var baseLayers = {
    GreenOrBlue: imagery,
    Streetmap: streets,
};

var overlays = {
  "Seven Wonders": landmarks,
};

L.control.layers(baseLayers, overlays, { collapsed: false }).addTo(map);

var clickPopup = L.popup();

function onMapClick(e) {
  var lat = e.latlng.lat;
  var lon = e.latlng.lng;
  
  clickPopup  
    .setLatLng(e.latlng)
    .setContent(
      "You clicked the map at: <br>" +
       "<b>Lat:</b> " + lat.toFixed(5) + "<br>" +
      "<b>Lon:</b> " + lon.toFixed(5)
  )
  .openOn(map);
  
  document.getElementById("click-lat").textContent = lat.toFixed(5);
  document.getElementById("click-lon").textContent = lon.toFixed(5);
}

map.on("click", onMapClick);

var issIcon = L.icon({
  iconUrl: "images/iss200.png",
  iconSize: [80,52],
  iconAnchor: [25, 16],
});

var issMarker = L.marker([0, 0], { icon: issIcon }) . addTo(map);

//API endpoint
var api_url = "https://api.wheretheiss.at/v1/satellites/25544";

function formatTime(d) {
  return d.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", second: "2-digit"});
}

async function getISS() {
  try {
    var response = await fetch(api_url);
    if (!response.ok) throw new Error("ISS API error");
    var data = await response.json();
    var latitude = data.latitude;
    var longitude = data.longitude;
    
    issMarker.setLatLng([latitude, longitude]);
    
    document.getElementById("lat").textContent = latitude.toFixed(3);
    document.getElementById("lon").textContent = longitude.toFixed(3);
    document.getElementById("iss-time").textContent = formatTime(new Date());
  } catch (err) {
    document.getElementById("iss-time").textContent = "ISS unavailable";
  }
}

//Initial call + refresh
getISS();
setInterval(getISS, 1000);

//Jump to ISS button (required feature
document.getElementById("btn-iss").addEventListener("click", function () {
 var ll = issMarker.getLatLng();
  map.setView([ll.lat, ll.lng], 4);
});


var miniLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: 0,
  maxZoom: 13,
  attribution: '&copy; OpenStreetMap'
});

// Add minimap control
var miniMap = new L.Control.MiniMap(miniLayer, {
  toggleDisplay: true,
  minimized: false,
  position: "bottomleft"
}).addTo(map);


L.control.polylineMeasure().addTo(map);

var measureOptions = {
  position: "",
  unit: "kilometres",
  showBearings: true,
  clearMeasurementsOnStop: false,
  showClearControl: true,
  showUnitControl: true
};

L.control.polylineMeasure(measureOptions).addTo(map);

var map = L.map('map').setView([30.182505,-93.318665], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution:'&copy; OpenStreetMap contributors'
}).addTo(map);

// Add Better Scale Bar
L.control.betterscale({
    position: "topright",
    metric: true,
    imperial: true
}).addTo(map);




