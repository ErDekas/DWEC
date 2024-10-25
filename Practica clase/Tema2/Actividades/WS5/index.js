function mostrarNombre() {
    alert("Este es el marcador.");
}

function mostrarHost() {
    alert("El nombre del host es: " + window.location.hostname);
}

function mostrarURL() {
    alert("La URL completa de la página actual es: " + window.location.href);
}

function irADireccion() {
    var direccion = prompt("Introduce una dirección URL:");
    if (direccion) {
        window.location.href = direccion;
    }
}

function mostrarProtocolo() {
    alert("El protocolo utilizado es: " + window.location.protocol);
}

function recargarPagina() {
    location.reload();
}