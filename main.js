// Set up my map
var mymap = L.map('mapid', { 
  zoomControl: false,
}).setView([1.33, 103.84], 12);

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
var northEast = L.latLng(1.5004, 104.1682),
  southWest = L.latLng(1.1593, 103.5118),
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
      var marker = L.circleMarker(latlng, geojsonMarkerOptions);
      marker.on('click', openNav); // click on marker to open panel
      return marker;
    },

    onEachFeature: function onEachFeature(feature, layer) {
      if (feature.properties && feature.properties.farm)
        layer.bindTooltip(feature.properties.farm);
    }

  }).addTo(mymap);
});

function openNav(e) {
  var nav = document.getElementById("info-panel");
  if (nav.style.width = "0") {
    if (window.matchMedia("(max-width: 420px)").matches) {
      nav.style.width = "300px";
    } else {
      nav.style.width = "500px";
    }
  }
  setTimeout(function(){ populateInfoPanel(e); }, 300);
}

function closeNav() {
  var infoPanel = document.getElementById("info-panel");
  if (infoPanel.style.width == "500px" || infoPanel.style.width == "300px") {
    infoPanel.style.width= "0";
  }
  var infoPanelContent = document.getElementById("info-panel-content");
  infoPanelContent.innerHTML = "";
}

function populateInfoPanel(e) {
  var infoPanelContent = document.getElementById("info-panel-content");
  infoPanelContent.innerHTML = "";
  var header = document.createElement("h1");
  header.textContent = e.target.feature.properties.farm;
  var paragraph = document.createElement("p");
  //paragraph.textContent = e.target.feature.properties.address;
  paragraph.textContent = e.target.feature.properties.writeup;
  infoPanelContent.appendChild(header);
  infoPanelContent.appendChild(paragraph);

  var steps = 0
  var timer = setInterval(function() {
    steps++;
    header.style.opacity = 0.05 * steps;
    paragraph.style.opacity = 0.05 * steps;
    if(steps >= 20) {
      clearInterval(timer);
      timer = undefined;
    }
  }, 50);
}
