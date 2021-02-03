// Set up my map
var center = L.bounds([1.5008354168795537, 104.23793792724611], [1.1596650771882608, 103.58150482177736]).getCenter();
var mymap = L.map('mapid', { zoomControl: false }).setView([center.x, center.y], 12);

L.tileLayer('https://maps-{s}.onemap.sg/v3/Grey/{z}/{x}/{y}.png', {
  detectRetina: true,
  maxZoom: 18,
  minZoom: 12,
  //Do not remove this attribution
  attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
}).addTo(mymap);

// Set Max Bounds
console.log(mymap.getBounds());
var northEast = L.latLng(1.5008354168795537, 104.23793792724611),
  southWest = L.latLng(1.1596650771882608, 103.58150482177736),
  bounds = L.latLngBounds(southWest, northEast);
mymap.setMaxBounds(bounds);

// Style markers
var geojsonMarkerOptions = {
  radius: 9,
  fillColor: "#3d696e",
  color: "#3d696e",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.6
};

// Singapore's farms 
$.getJSON("https://philemonheng.com/sg_parks_n_farms/geojsons/farms_pts.json", function(farms_pts) {

  // iteratively add popupContent for testing
  for (i in farms_pts["features"]) {
    farms_pts["features"][i]["properties"]["popupContent"] = "testing";
  }

  L.geoJSON(farms_pts, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    },

    onEachFeature: function (feature, layer) {
      if (feature.properties && feature.properties.farm)
        layer.bindTooltip(feature.properties.farm);
    }

  }).addTo(mymap);
});
