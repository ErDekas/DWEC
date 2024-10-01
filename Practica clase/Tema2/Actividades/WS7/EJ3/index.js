let map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
            const marker = L.marker([lat, lon]).addTo(map);
            map.setView([lat, lon], 13);
            marker.bindPopup('You are here!').openPopup();
            reverseGeocode(lat, lon);
    });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function reverseGeocode(lat, lon) {
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.reverse([lat, lon], map.options.crs.scale(map.getZoom()), (results) => {
        const address = results[0] ? results[0].name : "Address not found.";
        document.getElementById('address').innerText = `Your address: ${address}`;
    });
}

document.getElementById('getRoute').addEventListener('click', () => {
    const destination = prompt("Enter the destination address:");
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.geocode(destination, (results) => {
        if (results.length > 0) {
            const destLat = results[0].center.lat;
            const destLon = results[0].center.lng;
            L.Routing.control({
                waypoints: [
                    L.latLng(map.getCenter().lat, map.getCenter().lng),
                    L.latLng(destLat, destLon)
                ],
                language: 'es',
                routeWhileDragging: true
            }).addTo(map);
        } else {
            alert("Destination not found.");
        }
    });
});

getLocation();