const map = L.map('map').setView([0, 0], 2); // Vista por defecto

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Geolocalización
function onLocationFound(e) {
    const userLocation = e.latlng;
    L.marker(userLocation).addTo(map)
        .bindPopup("Tu ubicación").openPopup();
    map.setView(userLocation, 13);

    // Aquí puedes definir la dirección de destino
    const destination = L.latLng(51.515, -0.09); // Cambia las coordenadas al destino deseado
    L.marker(destination).addTo(map).bindPopup("Destino").openPopup();

    // Calcular ruta
    const routingControl = L.Routing.control({
        waypoints: [
            userLocation,
            destination
        ],
        language: 'es',
        routeWhileDragging: true
    }).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}

map.locate({ setView: true, maxZoom: 16 });
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
