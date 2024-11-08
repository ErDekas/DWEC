function CrearCookie(identificador, valor, fechaExpiracion) {
  let cookie = `${identificador}=${encodeURIComponent(valor)};`;

  if (fechaExpiracion) {
    cookie += `expires=${fechaExpiracion.toUTCString()};`;
  }

  cookie += "path=/"; // Opcional: la cookie será accesible desde todo el dominio.
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
  return null; // Si no se encuentra la cookie, se devuelve null
}
function BorrarCookie(identificador) {
  let fechaExpiracion = new Date(0); // Fecha en el pasado
  document.cookie = `${identificador}=; expires=${fechaExpiracion.toUTCString()}; path=/`;
}
