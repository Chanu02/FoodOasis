let map;

async function initMap() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;

    var mapOptions = {
      center: { lat: userLat, lng: userLng },
      zoom: 12
    };

    const Map = google.maps.Map;
    const InfoWindow = google.maps.InfoWindow;
    const Marker = google.maps.Marker;
    map = new Map(document.getElementById("map"), mapOptions);

    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: { lat: userLat, lng: userLng },
      radius: 5000,
      keyword: "grocery store" 
    };

    service.nearbySearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const groceryStoreTypes = ['grocery_or_supermarket', 'supermarket'];
        const excludedTypes = ['restaurant', 'park'];

        const groceryStoresList = document.getElementById("list");

        results.forEach(function(place) {
          const placeTypes = place.types;
          const shouldExclude = excludedTypes.some(type => placeTypes.includes(type));

          if (groceryStoreTypes.includes(placeTypes[0]) && !shouldExclude) {
            new Marker({
              position: place.geometry.location,
              map: map
            });

            const listItem = document.createElement("li");
            listItem.textContent = place.name;
            
            const storeInfo = document.createElement("div");
            storeInfo.className = "store-info";
            storeInfo.innerHTML = "<p>" + place.name + "</p>" +
              "<p>Address: " + place.vicinity + "</p>";
            
            listItem.appendChild(storeInfo);
            listItem.addEventListener("click", function() {
              storeInfo.classList.toggle("show");
              marker.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(function() {
                marker.setAnimation(null);
              }, 1500);
            });
            groceryStoresList.appendChild(listItem);
          }
        });
      }
    });
  });
}

initMap();
