const map = L.map("map").setView([48.02162, -88.8474], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([48.14575, -88.4861])
  .addTo(map)
  .bindPopup("<b>Welcome to Isle Royale!</b><br>This is where I started my trip; at Rock Harbor Visitor Center.")
  .openPopup();

L.marker ([48.092001, -88.5946])
    .addTo(map)

L.marker ([48.07299, -88.6979])
    .addTo(map)

L.marker ([48.02162, -88.8474])
    .addTo(map)

L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
               '<a href="https://opentopomap.org">OpenTopoMap</a>'
}).addTo(map);