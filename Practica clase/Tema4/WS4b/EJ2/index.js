function borrarUltimoCaracter() {
  const display = document.getElementById("display");
  const valorActual = display.value;
  if (valorActual.length > 0) {
    // Elimina el último carácter del valor actual del campo de entrada
    display.value = valorActual.slice(0, -1);
  }
}

function agregarCaracter(caracter) {
  const display = document.getElementById("display");
  // Evita añadir caracteres no válidos en la pantalla
  if (/^[0-9+\-*/.%()]*$/.test(caracter)) {
    display.value += caracter;
  } else {
    console.warn("Caracter no válido");
  }
}

function realizarCalculo(operador) {
  const display = document.getElementById("display");
  try {
    if (operador === "=") {
      // Evalúa solo si la expresión es válida
      if (/^[0-9+\-*/.%() ]+$/.test(display.value)) {
        const resultado = eval(display.value);

        // Verifica si el resultado es NaN o infinito
        if (isNaN(resultado) || !isFinite(resultado)) {
          display.value = "Error";
        } else {
          display.value = resultado;
        }
      } else {
        display.value = "Error";
      }
    } else if (/^[+\-*/%]$/.test(operador)) {
      // Solo permite operadores válidos
      display.value += operador;
    }
  } catch (error) {
    display.value = "Error"; // Muestra "Error" en caso de excepción
    console.error("Error en la evaluación: ", error);
  }
}

function realizarCalculoPercent() {
  const display = document.getElementById("display");
  // Convierte a porcentaje solo si el valor es numérico
  if (!isNaN(display.value) && display.value !== "") {
    display.value = parseFloat(display.value) / 100;
  } else {
    display.value = "Error";
  }
}

function resetDiv() {
  const display = document.getElementById("display");
  display.value = "";
}
