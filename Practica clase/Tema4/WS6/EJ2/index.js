// Funciones para manejo de cookies (igual que antes)
function CrearCookie(identificador, valor, fechaExpiracion) {
  let cookie = `${identificador}=${encodeURIComponent(valor)};`;
  if (fechaExpiracion) {
    cookie += `expires=${fechaExpiracion.toUTCString()};`;
  }
  cookie += "path=/";
  document.cookie = cookie;
}

function LeerCookie(identificador) {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith(identificador + "=")) {
      return decodeURIComponent(cookie.substring(identificador.length + 1));
    }
  }
  return null;
}

function BorrarCookie(identificador) {
  let fechaExpiracion = new Date(0);
  document.cookie = `${identificador}=; expires=${fechaExpiracion.toUTCString()}; path=/`;
}

// Personalización de estilo
function guardarConfiguracion() {
  let fondoColor = document.getElementById("fondoColor").value;
  let parrafoColor = document.getElementById("parrafoColor").value;
  let tamanoTexto = document.getElementById("tamanoTexto").value;

  CrearCookie(
    "fondoColor",
    fondoColor,
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
  ); // Expira en 1 año
  CrearCookie(
    "parrafoColor",
    parrafoColor,
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
  );
  CrearCookie(
    "tamanoTexto",
    tamanoTexto,
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
  );

  aplicarConfiguracion();
}

function aplicarConfiguracion() {
  let fondoColor = LeerCookie("fondoColor");
  let parrafoColor = LeerCookie("parrafoColor");
  let tamanoTexto = LeerCookie("tamanoTexto");

  if (fondoColor) document.body.style.backgroundColor = fondoColor;
  if (parrafoColor) document.body.style.color = parrafoColor;
  if (tamanoTexto) document.body.style.fontSize = tamanoTexto + "px";
}

// Comprobación y saludo
function saludarUsuario() {
  let nombre = LeerCookie("nombreUsuario");

  if (nombre) {
    document.getElementById(
      "mensaje"
    ).innerHTML = `¡Hola, ${nombre}! Bienvenido de nuevo.`;
  } else {
    nombre = prompt("¿Cómo te llamas?");
    if (nombre) {
      let fechaExpiracion = new Date();
      fechaExpiracion.setMinutes(fechaExpiracion.getMinutes() + 5);
      CrearCookie("nombreUsuario", nombre, fechaExpiracion);
      document.getElementById(
        "mensaje"
      ).innerHTML = `¡Hola, ${nombre}! Bienvenido por primera vez.`;
    }
  }
}

// Cerrar sesión y borrar cookie
document.getElementById("cerrarSesion").addEventListener("click", function () {
  BorrarCookie("nombreUsuario");
  BorrarCookie("fondoColor");
  BorrarCookie("parrafoColor");
  BorrarCookie("tamanoTexto");
  document.getElementById("mensaje").innerHTML =
    "Has cerrado sesión. ¡Hasta pronto!";
});

// Llamada para aplicar configuraciones previas y saludar
aplicarConfiguracion();
saludarUsuario();

// Guardar configuración al cambiar cualquier opción
document
  .getElementById("fondoColor")
  .addEventListener("input", guardarConfiguracion);
document
  .getElementById("parrafoColor")
  .addEventListener("input", guardarConfiguracion);
document
  .getElementById("tamanoTexto")
  .addEventListener("input", guardarConfiguracion);
