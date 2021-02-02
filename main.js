var mymap = L.map('mapid', { zoomControl: false }).setView([1.323, 103.8198], 12);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    minZoom: 12,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZmlsbGluZ3RoZW1vb24iLCJhIjoiY2tpaGxrbjZmMDNicTJ4bThmd3preWJvbyJ9.ca_X_SaaPktyuEBL2RzoRA'
}).addTo(mymap);

// Set Max Bounds
var southWest = L.latLng(1.1627543474077802, 103.49224090576172),
  northEast = L.latLng(1.483331893392633, 104.14764404296875),
  bounds = L.latLngBounds(southWest, northEast);
mymap.setMaxBounds(bounds);

fetch("https://philemonheng.com/sg_parks_n_farms/geojsons/parks.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    L.geoJSON(data, {
      style: function(feature) {
        return { color: "#658a49" };
      }
    }).addTo(mymap);
  });
