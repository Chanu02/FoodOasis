const firebaseConfig = {
  apiKey: "AIzaSyCS95Z9r-h3s2CNDp6ugTKdjjm2wmi6cAA",
  authDomain: "food-oasis-8fb7a.firebaseapp.com",
  databaseURL: "https://food-oasis-8fb7a-default-rtdb.firebaseio.com",
  projectId: "food-oasis-8fb7a",
  storageBucket: "food-oasis-8fb7a.appspot.com",
  messagingSenderId: "376961100739",
  appId: "1:376961100739:web:d577cb74df3bb08b176b76",
  measurementId: "G-LDRHY9JG5L"
};
// update update update

firebase.initializeApp(firebaseConfig);

let map;

function initMap() {
  navigator.geolocation.getCurrentPosition(function (position) {
    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;

    var mapOptions = {
      center: { lat: userLat, lng: userLng },
      zoom: 12,
    };

    const Map = google.maps.Map;
    const InfoWindow = google.maps.InfoWindow;
    const Marker = google.maps.Marker;
    map = new Map(document.getElementById("map"), mapOptions);

    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: { lat: userLat, lng: userLng },
      radius: 5500,
      keyword: "grocery store",
    };

    service.nearbySearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const groceryStoreTypes = ["grocery_or_supermarket", "supermarket"];
        const excludedTypes = ["restaurant", "park"];

        const groceryStoresList = document.getElementById("list");

        results.forEach(function (place) {
          const placeTypes = place.types;
          const shouldExclude = excludedTypes.some((type) =>
            placeTypes.includes(type)
          );

          if (
            groceryStoreTypes.includes(placeTypes[0]) &&
            !shouldExclude
          ) {
            const marker = new Marker({
              position: place.geometry.location,
              map: map,
            });

            const listItem = document.createElement("li");
            listItem.textContent = place.name;

            const storeInfo = document.createElement("div");
            storeInfo.className = "store-info";
            storeInfo.innerHTML =
              "<p>" +
              place.name +
              "</p>" +
              "<p>Address: " +
              place.vicinity +
              "</p>";

            const milkPriceElement = document.createElement("p");
            milkPriceElement.className = "milk-price";
            storeInfo.appendChild(milkPriceElement);

            listItem.addEventListener("click", function () {
              storeInfo.classList.toggle("show");
              marker.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(function () {
                marker.setAnimation(null);
              }, 1500);

              getStoreDetails(place.place_id, place.name, milkPriceElement);
            });

            groceryStoresList.appendChild(listItem);
            listItem.appendChild(storeInfo);
          }
        });
      }
    });
  });
}

function getStoreDetails(placeId, storeName, milkPriceElement) {
  var db = firebase.firestore();

  db.collection("Products")
    .doc("prices")
    .get()
    .then((doc) => {
      if (doc.exists) {
        var prices = doc.data();
        var milkPrice = prices.Milk;
        milkPriceElement.textContent = "Milk Price: " + milkPrice;
      } else {
        console.log("No prices document found");
      }
    })
    .catch((error) => {
      console.log("Error getting milk price:", error);
    });
}

initMap();
