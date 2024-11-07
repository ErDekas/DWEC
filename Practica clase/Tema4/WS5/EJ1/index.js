// Validar si contiene al menos una letra mayúscula
function validarMayuscula(valor) {
  const regex = /[A-Z]/;
  return regex.test(valor);
}

// Validar si contiene al menos uno de los caracteres especiales: !@#$%^&
function validarCaracteresEspeciales(valor) {
  const regex = /[!@#$%^&]/;
  return regex.test(valor);
}

// Validar si tiene el formato correcto de un correo electrónico
function validarCorreo(valor) {
  const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(valor);
}

// Validar si tiene el formato correcto de una tarjeta de crédito
// (Se admiten números de 13 a 19 dígitos, usuales en tarjetas de crédito)
function validarTarjetaCredito(valor) {
  const regex = /^\d{13,19}$/;
  return regex.test(valor);
}

// Validar si tiene al menos 8 caracteres de longitud
function validarLongitud(valor) {
    const regex = /.{8,}/
  return regex.test(valor);
}

// Validar si contiene al menos un dígito
function validarNumero(valor) {
  const regex = /\d/;
  return regex.test(valor);
}
