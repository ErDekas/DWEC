// Crear cookie sin fecha de expiración
function CrearCookie(identificador, valor) {
  let cookie = `${identificador}=${encodeURIComponent(valor)}; path=/`;
  document.cookie = cookie;
}
