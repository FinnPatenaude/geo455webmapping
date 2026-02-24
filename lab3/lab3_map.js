const map = L.map("map").setView([48.02162, -88.8474], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([48.14575, -88.4861])
  .addTo(map)
  .bindPopup("<b>Location #1: Rock Harbor Visitor Center</b><br>This is where most people arrive to the island. My tripmates and I started our trip here too, arriving on the Isle Royale Queen IV ferry from Copper Harbor, MI before starting our way west on the southern coast of the main island.")
  .openPopup();

L.marker ([48.092001, -88.5946])
    .addTo(map)
    .bindPopup("<b> Location #2: Daisy Farm Campground</b> <br>This is where we stayed our first night. This site reminded me a lot of my grandfather, it had an amazing rocky beach and a great dock to jump off of and read on. We revisited this campground when we were picked up by the Voyageur II Ferry on Day 14.");

L.marker ([48.07299, -88.6979])
    .addTo(map)
    .bindPopup("<b>Location #3: East Chicken Bone Lake Campground</b> <br> This was one of the buggiest campsites of them all, it didn't help that I decided to sleep outside in my hammock this night. We already missed the island's coastal sites.");
  
L.marker ([48.02162, -88.8474])
    .addTo(map)
    .bindPopup("<b> Location #4: Hatchet Lake Campground </b> <br> We saw our second moose of the trip here as we walked along the shore into our campsite. It returned later while I was using the spider-infested outhouse and I had my closest encounter with a moose EVER.");

L.marker ([47.97152,-88.9715])
    .addTo(map)
    .bindPopup("<b> Location #5: South Lake Desor Campground </b> <br> This day of hiking was fantastic, we hiked up Ishpeming Point which is one of the highest places on the Greenstone Ridge and could look down onto Lake Desor around lunch time. I was able to take some of my all-time favorite sunset pictures after we set up camp just southeast of the lake.");

L.marker ([47.9171,-89.1526 ])
    .addTo(map)
    .bindPopup("<b> Location #6: Washington Creek Campground </b> <br> This is one of the main campsites that people who arrive at Windigo Visitor Center stay at. For that reason, they have lean-tos which are an absolute treat on trips like this. The night we stayed here I was able to sit and eat dinner while hanging out with a moose roughly 20-25 feet in front of me in the creek. Food wasn't anything special, but the view was amazing.");

L.marker ([47.91166, -89.1571])
    .addTo(map)
    .bindPopup("<b> Location #7: Windigo Visitor Center </b> <br> Here at the southwestern end of the island is another common entrance point. Hosting the second visitor center and a small convenience store, we were able to ship our resupply (aka second weeks worth of food) here for pickup. We also couldn't help ourselves and bought a few moonpies here with our extra pocket change. So sweet!");

L.marker ([47.84833,-89.1823 ])
    .addTo(map)
    .bindPopup("<b> Location #8: Feldtmann Lake Campground </b> <br> This was the furthest point of travel, once we reached Feldtmann Lake (which was absolute bursting with leeches by the way!) we turned around and headed back to Windigo before continuing back up the Minong Ridge on Northern side of the island.");

L.marker ([47.84214,-89.1926 ])
    .addTo(map)
    .bindPopup("<b> Location #9: Rainbow Cove Trail </b> <br> We were able to take a duff day (a day where we stayed put, instead of hiking every day like we had been) hike from Feldtmann Lake out to Rainbow Cove. It always felt amazing to finally get out onto the open Lake Superior, even if it was freezing cold. It especially felt nice to hike without the weight of our massive backpacks for once.");

L.marker ([47.98086,-88.9943])
    .addTo(map)
    .bindPopup("<b> Location #10: North Lake Desor Campground </b> <br> We unfortunately didn't have the most fun on this leg of the trip. After passing through Windigo again, one of my tripmates got very sick, so when this campsite was bit gloomy and far from the water, we weren't thrilled. I did meditate for maybe the first time ever here with the help of my friend, and I still think that was the best meditation of my life so far.");

L.marker ([48.06383,-88.7241 ])
    .addTo(map)
    .bindPopup("<b> Location #11: West Chicken Bone Lake Campground </b> <br> We were well on our way to the end of our trip by this point, having only one more day to reach our beloved Daisy Farm campground and be picked up. Partially because of that impending end, I don't remember a lot about this site, that inability is also aided by the fact I had a dead camera battery by this point."); 

L.marker ([48.009405, -88.771696])
 .addTo(map)
   .bindPopup("<b> Location #12: (Bonus!) Ryan Island </b> <br> This is the largest island on the largest lake on the largest island on the largest lake in the world. I was inspired to add this to the map by Robert Annis's article published on fodors.com. I did not travel here, but it is on my itinerary for my return trip to Isle Royale where I hope to kayak along the southern lakes and south shore of the island.");


L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  maxZoom: 17,
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
               '<a href="https://opentopomap.org">OpenTopoMap</a>'
}).addTo(map);