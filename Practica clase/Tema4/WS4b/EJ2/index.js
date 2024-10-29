function borrarUltimoCaracter() {
  var display = document.getElementById("display");
  var valorActual = display.value;
  if (valorActual.length > 0) {
    // Elimina el último carácter del valor actual del campo de entrada
    display.value = valorActual.slice(0, -1);
  }
}
function agregarCaracter(caracter) {
  var display = document.getElementById("display");
  display.value += caracter;
}
function realizarCalculo(operador) {
  var display = document.getElementById("display");
  try {
    if (operador === "=") {
      // Evalúa la expresión y guarda el resultado
      var resultado = eval(display.value);
      // Verifica si el resultado es NaN
      if (isNaN(resultado)) {
        display.value = ""; // Borra completamente el display si es NaN
      } else {
        display.value = resultado; // Muestra el resultado
      }
    } else {
      display.value += operador; // Agrega el operador
    }
  } catch (error) {
    display.value = "Error"; // Muestra "Error" en caso de excepción
  }
}
function realizarCalculoPercent() {
  var display = document.getElementById("display");
  if (!isNaN(display.value)) {
    display.value = parseFloat(display.value) / 100;
  }
}
function resetDiv() {
  var display = document.getElementById("display");

  display.value = "";
}
