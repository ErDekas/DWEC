let idDeObservacion;
let distanciaTotal = 0;
let ultimaPosicion = null;

function actualizarPosicion(posicion) {
    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;
    const precision = posicion.coords.accuracy;

    document.getElementById('coordinates').innerText = 
        `Latitud: ${latitud}, Longitud: ${longitud}, Precisión: ${precision} metros`;

    if (ultimaPosicion) {
        const distancia = calcularDistancia(ultimaPosicion.latitud, ultimaPosicion.longitud, latitud, longitud);
        distanciaTotal += distancia;
    }

    ultimaPosicion = { latitud, longitud };
    document.getElementById('distance').innerText = `Distancia recorrida: ${distanciaTotal.toFixed(2)} metros`;
}

function calcularDistancia(lat1, lon1, lat2, lon2) {
    const aRadianes = (angulo) => angulo * (Math.PI / 180);
    const R = 6371000; // Radio de la Tierra en metros
    const dLat = aRadianes(lat2 - lat1);
    const dLon = aRadianes(lon2 - lon1);

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(aRadianes(lat1)) * Math.cos(aRadianes(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distancia en metros
}

function manejarError(error) {
    const mensajeError = {
        0: "No se puede obtener tu ubicación.",
        1: "Permiso denegado.",
        2: "Posición no disponible.",
        3: "Tiempo de espera agotado."
    };
    document.getElementById('status').innerText = mensajeError[error.code] || "Ocurrió un error desconocido.";
}

function iniciarSeguimiento() {
    if (navigator.geolocation) {
        idDeObservacion = navigator.geolocation.watchPosition(actualizarPosicion, manejarError, {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        });
    } else {
        document.getElementById('status').innerText = "La geolocalización no es compatible con este navegador.";
    }
}

document.addEventListener("DOMContentLoaded", iniciarSeguimiento);
