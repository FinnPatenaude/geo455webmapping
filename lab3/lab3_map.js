const map = L.map("map").setView([48.02162, -88.8474], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([48.14575, -88.4861])
  .addTo(map)
  .bindPopup("<b>Location #1: Rock Harbor Visitor Center</b><br>Welcome to Isle Royale! This is where most people arrive to the island. My tripmates and I started our trip here too, arriving on the Isle Royale Queen IV ferry from Copper Harbor, MI.")
  .openPopup();

L.marker ([48.092001, -88.5946])
    .addTo(map)
    .bindPopup("<b> Location #2: Daisy Farm Campground</b> <br>This is where we stayed our first night. This site reminded me a lot of my grandfather, it had an amazing rocky beach and a great dock to jump off of and read on. We revisited this campground when we were picked up by the Ranger II Ferry on Day 14.");

L.marker ([48.07299, -88.6979])
    .addTo(map)
    .bindPopup("");
  
L.marker ([48.02162, -88.8474])
    .addTo(map);

L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
               '<a href="https://opentopomap.org">OpenTopoMap</a>'
}).addTo(map);