// Set up my map
var mymap = L.map('mapid', { zoomControl: false }).setView([1.33, 103.84], 12);

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
var northEast = L.latLng(1.5004922118779245, 104.16824340820312),
  southWest = L.latLng(1.1593218247333539, 103.51181030273438),
  bounds = L.latLngBounds(southWest, northEast);
mymap.setMaxBounds(bounds);

// NParks Parks
fetch("https://philemonheng.com/sg_parks_n_farms/geojsons/farms_pts.json")
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
