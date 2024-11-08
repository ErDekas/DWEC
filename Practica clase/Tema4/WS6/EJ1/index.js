// Funciones para manejo de cookies
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
  let fechaExpiracion = new Date(0); // Fecha en el pasado
  document.cookie = `${identificador}=; expires=${fechaExpiracion.toUTCString()}; path=/`;
}

// Comprobación y saludo
function saludarUsuario() {
  let nombre = LeerCookie("nombreUsuario");

  if (nombre) {
    // Si existe la cookie, saludamos al usuario
    document.getElementById(
      "mensaje"
    ).innerHTML = `¡Hola, ${nombre}! Bienvenido de nuevo.`;
  } else {
    // Si no existe la cookie, pedimos el nombre
    nombre = prompt("¿Cómo te llamas?");
    if (nombre) {
      let fechaExpiracion = new Date();
      fechaExpiracion.setMinutes(fechaExpiracion.getMinutes() + 5); // Cookie expira en 5 minutos
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
  document.getElementById("mensaje").innerHTML =
    "Has cerrado sesión. ¡Hasta pronto!";
});

// Llamamos a la función para saludar
saludarUsuario();
