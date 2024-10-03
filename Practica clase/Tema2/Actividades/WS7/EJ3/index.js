// Inicializar el mapa
const platform = new H.service.Platform({
    'apikey': 'ONtYT_CXhkaUJFyradghrYIc9BVZ-H1VnVFX5bjTsFA' // Reemplaza con tu API Key de Here
});

const defaultLayers = platform.createDefaultLayers();
const map = new H.Map(
    document.getElementById('map'),
    defaultLayers.vector.normal.map,
    {
        zoom: 2,
        center: { lat: 0, lng: 0 }
    }
);

// Añadir controles de UI
const ui = H.ui.UI.createDefault(map, defaultLayers);

// Habilitar eventos de mapa
const mapEvents = new H.mapevents.MapEvents(map);
const behavior = new H.mapevents.Behavior(mapEvents);

// Función de geolocalización
function onLocationFound(position) {
    const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
    const marker = new H.map.Marker(userLocation);
    map.addObject(marker);
    marker.setData("Tu ubicación");
    map.setCenter(userLocation);
    map.setZoom(13);

    // Definir destino
    const destination = { lat: 51.515, lng: -0.09 };
    const destMarker = new H.map.Marker(destination);
    map.addObject(destMarker);
    destMarker.setData("Destino");

    // Calcular ruta
    const routingService = platform.getRoutingService();
    const routeRequestParams = {
        'routingMode': 'fast',
        'transportMode': 'car',
        'waypoint0': `geo!${userLocation.lat},${userLocation.lng}`,
        'waypoint1': `geo!${destination.lat},${destination.lng}`,
        'representation': 'display'
    };
    routingService.calculateRoute(routeRequestParams,
        (result) => {
            const route = result.response.route[0];
            const routeLineString = H.geo.LineString.fromFlexiblePolyline(route.polyline);
            const routeLine = new H.map.Polyline(routeLineString, { style: { strokeColor: 'blue', lineWidth: 5 } });
            map.addObject(routeLine);
            map.setViewBounds(routeLine.getBounds());
        },
        (error) => {
            console.error(error);
        }
    );
}

// Manejo de errores de localización
function onLocationError(error) {
    alert(error.message);
}

// Intentar geolocalizar
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onLocationFound, onLocationError);
} else {
    alert("Geolocalización no es soportada por este navegador.");
}